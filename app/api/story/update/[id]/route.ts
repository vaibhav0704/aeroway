import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { generateSlug } from "../../../utils/slug";
import { uploadToS3 } from "../../../utils/s3";

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {

    const params=await context.params
  try {
    const storyId = Number(params.id);

    if (!storyId || isNaN(storyId)) {
      return NextResponse.json(
        { message: "Invalid story ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const description = formData
      .get("description")
      ?.toString();
    const mediaType = formData
      .get("mediaType")
      ?.toString();

    if (!title || !description || !mediaType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getDB();
    const storySlug = generateSlug(title);

    const [existingStory]: any = await db.query(
      "SELECT cover_image FROM stories WHERE id = ?",
      [storyId]
    );

    if (!existingStory || existingStory.length === 0) {
      return NextResponse.json(
        { message: "Story not found" },
        { status: 404 }
      );
    }

    let coverImageUrl =
      existingStory[0].cover_image;

    const file = formData.get("file") as File | null;

    if (file) {
      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      coverImageUrl = await uploadToS3("stories", {
        buffer,
        originalname: file.name,
        mimetype: file.type,
      });
    }

    await db.query(
      `UPDATE stories
       SET story_slug = ?, title = ?, description = ?, cover_image = ?, media_type = ?
       WHERE id = ?`,
      [
        storySlug,
        title,
        description,
        coverImageUrl,
        mediaType,
        storyId,
      ]
    );

    return NextResponse.json({
      message: "Story updated successfully",
      story: {
        id: storyId,
        story_slug: storySlug,
        title,
        description,
        cover_image: coverImageUrl,
        media_type: mediaType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating story", error },
      { status: 500 }
    );
  }
};
