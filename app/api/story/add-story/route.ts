import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { generateSlug } from "../../utils/slug";
import { uploadToS3 } from "../../utils/s3";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const storyTags = formData.get("storyTags")?.toString() || "";
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();

    const storiesRaw = formData.getAll("stories"); // must match frontend key "stories"

    if (!title || !date || !time || storiesRaw.length === 0) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const db = getDB();
    const storySlug = generateSlug(title);

    const insertedStories: any[] = [];


    for (let i = 0; i < storiesRaw.length; i++) {
      const story = JSON.parse(storiesRaw[i] as string);

    
      const files = formData.getAll("files") as File[];
      if (!story.caption || !files[i]) continue;

      const buffer = Buffer.from(await files[i].arrayBuffer());
      const fileUrl = await uploadToS3("stories", {
        buffer,
        originalname: files[i].name,
        mimetype: files[i].type,
      });

      
      await db.query(
        "INSERT INTO stories (story_slug, title, description, cover_image, media_type, created_date, status) VALUES (?, ?, ?, ?, ?, NOW(), 1)",
        [storySlug, title, story.caption, fileUrl, story.mediaType]
      );

      insertedStories.push({
        story_slug: storySlug,
        title,
        description: story.caption,
        cover_image: fileUrl,
        media_type: story.mediaType,
      });
    }

    return NextResponse.json({
      message: "Stories created successfully",
      stories: insertedStories,
    });
  } catch (error) {
    console.error("Error in POST /api/story/add-story:", error);
    return NextResponse.json({ message: "Error creating story", error }, { status: 500 });
  }
};
