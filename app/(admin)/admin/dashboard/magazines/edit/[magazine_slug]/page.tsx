"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Breadcrumb from "../../../components/bread-crumb";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface FormValues {
  magazine_id: string;
  magazine_title: string;
  magazine_tags: string;
  magazine_cover_image: File | string;
  magazine_description: string;
  magazine_category: string;
  MagCloudLink: string;
  magazine_link: string;
  date: string;
}

const editorConfig: any = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "middle",
  minHeight: 542,
  uploader: { insertImageAsBase64URI: true },
};

export default function EditMagazine() {
  const params = useParams();
  const router = useRouter();
  const { magazine_slug } = params;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState<FormValues>({
    magazine_id: "",
    magazine_title: "",
    magazine_tags: "",
    magazine_cover_image: "",
    magazine_description: "",
    magazine_category: "",
    MagCloudLink: "",
    magazine_link: "",
    date: "",
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const res = await axios.get(`/api/magazine/fetchone/${magazine_slug}`);
        const data = res.data;
        setValues({
          magazine_id: data.magazine_id,
          magazine_title: data.magazine_title,
          magazine_tags: data.magazine_tags || "",
          magazine_cover_image: data.magazine_cover_image,
          magazine_description: data.magazine_description,
          magazine_category: data.magazine_category || "",
          MagCloudLink: data.MagCloudLink || "",
          magazine_link: data.magazine_link || "",
          date: data.formatted_date,
        });
      } catch {
        toast.error("Failed to load magazine");
      } finally {
        setLoading(false);
      }
    };
    fetchMagazine();
  }, [magazine_slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setValues({ ...values, magazine_cover_image: image });
      const ext = image.name.split(".").pop()?.toLowerCase();
      if (!["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
        setErrorMessage("Allowed formats: JPG, JPEG, PNG, WEBP");
        imageInputRef.current!.value = "";
        setValues((prev) => ({ ...prev, magazine_cover_image: "" }));
        return;
      }
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (
      !values.magazine_title ||
      !values.magazine_description ||
      !values.magazine_tags ||
      !values.date ||
      !values.magazine_category ||
      !values.MagCloudLink ||
      !values.magazine_cover_image
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("magazine_title", values.magazine_title);
      formData.append("magazine_description", values.magazine_description);
      formData.append("magazine_tags", values.magazine_tags);
      formData.append("magazine_category", values.magazine_category);
      formData.append("MagCloudLink", values.MagCloudLink);
      formData.append("magazine_link", values.magazine_link);
      formData.append("date", values.date);

      if (values.magazine_cover_image instanceof File) {
        formData.append("magazine_cover_image", values.magazine_cover_image);
      } else {
        formData.append("magazine_cover_image", values.magazine_cover_image);
      }

      console.log("FormData Entries:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: FILE → ${value.name}, ${value.size}, ${value.type}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      await axios.put(`/api/magazine/update/${values.magazine_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Magazine updated!");
      router.push("/admin/dashboard/magazines");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const memoConfig = useMemo(() => editorConfig, []);

  if (loading) return <p className="p-10 text-lg">Loading...</p>;

  return (
    <div className="px-4 xl:px-20 flex flex-col gap-6 pt-6 min-h-screen">
      <Breadcrumb pageName="Edit Magazine" />
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm bg-white shadow p-6">
          <label className="block mb-2 font-medium">Magazine Title</label>
          <input
            type="text"
            value={values.magazine_title}
            onChange={(e) =>
              setValues({ ...values, magazine_title: e.target.value })
            }
            className="w-full mb-6 p-3 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
          />
          <label className="block mb-2 font-medium">Keywords</label>
          <input
            type="text"
            value={values.magazine_tags}
            onChange={(e) => setValues({ ...values, magazine_tags: e.target.value })}
            className="w-full mb-6 p-3 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
          />
          <label className="block mb-2 font-medium">Feature Image</label>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="mb-4 w-full p-2 border border-slate-300 rounded outline-none focus:border-orange-400 transition cursor-pointer"
          />
          {typeof values.magazine_cover_image === "string" && values.magazine_cover_image && (
            <img
              src={values.magazine_cover_image}
              className="w-40 rounded border border-slate-300 shadow mb-6"
            />
          )}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Date</label>
              <input
                type="date"
                value={values.date}
                onChange={(e) => setValues({ ...values, date: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Category</label>
              <input
                type="text"
                value={values.magazine_category}
                onChange={(e) => setValues({ ...values, magazine_category: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
              />
            </div>
          </div>
          <label className="block mt-6 mb-2 font-medium">MagCloud Link</label>
          <input
            type="text"
            value={values.MagCloudLink}
            onChange={(e) => setValues({ ...values, MagCloudLink: e.target.value })}
            className="w-full p-3 mb-6 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
          />
          <label className="block mb-2 font-medium">PDF Link</label>
          <input
            type="text"
            value={values.magazine_link}
            onChange={(e) => setValues({ ...values, magazine_link: e.target.value })}
            className="w-full p-3 mb-6 border border-slate-300 rounded outline-none focus:border-orange-400 transition"
          />
          <label className="block mb-2 font-medium">Content</label>
          <div className="border border-slate-300 rounded p-1 focus-within:border-orange-400 transition">
            <JoditEditor
              config={memoConfig}
              value={values.magazine_description}
              onChange={(value) => setValues({ ...values, magazine_description: value })}
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="py-2 px-6 rounded border border-slate-300 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-6 bg-orange-500 text-white rounded shadow hover:bg-orange-600 transition disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
