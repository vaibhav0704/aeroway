"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import Breadcrumb from "../../components/bread-crumb";
import JoditWrapper from "../../components/jodit-wrapper";


interface Blog {
  blog_id: number;
  blog_slug: string;
  blog_title: string;
  blog_description: string;
  blog_tag: string;
  blog_category_id: number;
  status: number;
  blog_feature_image: string;
  blog_content: string;
  blog_publisher_id: number;
  blog_date_time: string;
  blog_timestamp: string;
}

interface FormValues {
  title: string;
  tag: string;
  featureImage: File | string;
  date: string;
  time: string;
  category: string;
  description: string;
  content: string;
  publisher: number;
}

interface ClientPageProps {
  blog_slug: string;
}

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: "en",
  toolbarButtonSize: "medium",
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  uploader: { insertImageAsBase64URI: true },
  width: 1400,
  minHeight: 542,
};

const ClientPage = ({ blog_slug }: ClientPageProps) => {
  const [values, setValues] = useState<FormValues>({
    title: "",
    tag: "",
    featureImage: "",
    date: "",
    time: "",
    category: "",
    description: "",
    content: "",
    publisher: 1,
  });
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${blog_slug}`);
        const blogData: Blog = response.data.data;
        setBlog(blogData);

        const dateObj = new Date(blogData.blog_date_time);
        const dateStr = dateObj.toISOString().split("T")[0];
        const timeStr = dateObj.toTimeString().split(" ")[0].substring(0, 5);

        setValues({
          title: blogData.blog_title,
          tag: blogData.blog_tag,
          featureImage: blogData.blog_feature_image,
          date: dateStr,
          time: timeStr,
          category: blogData.blog_category_id.toString(),
          description: blogData.blog_description,
          content: blogData.blog_content,
          publisher: blogData.blog_publisher_id,
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [blog_slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValues({ ...values, featureImage: file || "" });

    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const allowed = ["jpeg", "jpg", "png", "webp"];
      setErrorMessage(
        ext && allowed.includes(ext)
          ? ""
          : "Invalid image format. JPEG, JPG, PNG, or WebP only."
      );
    }
  };

  const validateFields = (): boolean => {
    if (
      !values.title ||
      !values.tag ||
      !values.featureImage ||
      !values.date ||
      !values.time ||
      !values.category ||
      !values.description ||
      !values.content ||
      !values.publisher
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (errorMessage) {
      toast.error(errorMessage);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;
    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("blog_title", values.title);
      formData.append("blog_tag", values.tag);
      formData.append("blog_category_id", values.category);
      formData.append("blog_description", values.description);
      formData.append("blog_content", values.content);
      formData.append("blog_publisher_id", values.publisher.toString());
      formData.append("blog_date", values.date);
      formData.append("blog_time", values.time);

      if (values.featureImage instanceof File) {
        formData.append("blog_feature_image", values.featureImage);
      } else {
        formData.append("blog_feature_image", values.featureImage);
      }

      const response = await axios.put(`/api/blogs/update/${blog.blog_id}`, formData);

      toast.success(response.data.message || "Blog updated successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error updating blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9 mx-4 lg:mx-20 my-6">
      <Breadcrumb pageName="Update Blog" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border-orange-500 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Post Form</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              {/* Blog Title & Tag */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Blog Title</label>
                  <input
                    type="text"
                    value={values.title}
                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                    className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Tags</label>
                  <input
                    type="text"
                    value={values.tag}
                    onChange={(e) => setValues({ ...values, tag: e.target.value })}
                    className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

            
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Feature Image</label>
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      className="w-full rounded border border-slate-300 bg-transparent py-2 px-5 outline-none"
                    />
                    {errorMessage && <p className="text-primary text-sm mt-2">{errorMessage}</p>}
                    {values.featureImage && typeof values.featureImage === "string" && (
                      <Image
                        src={values.featureImage}
                        alt="Feature"
                        height={400}
                        width={600}
                        className="mt-2 w-60"
                      />
                    )}
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Category</label>
                    <select
                      value={values.category}
                      onChange={(e) => setValues({ ...values, category: e.target.value })}
                      className="w-full rounded border border-slate-300 bg-transparent py-3 px-5 outline-none"
                    >
                      <option value="">Choose Category</option>
                      {categories?.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

       
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Date</label>
                  <input
                    type="date"
                    value={values.date}
                    onChange={(e) => setValues({ ...values, date: e.target.value })}
                    className="w-full rounded border border-slate-300 bg-transparent py-3 px-5 outline-none"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Time</label>
                  <input
                    type="time"
                    value={values.time}
                    onChange={(e) => setValues({ ...values, time: e.target.value })}
                    className="w-full rounded border border-slate-300 bg-transparent py-3 px-5 outline-none"
                  />
                </div>
              </div>

       
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  value={values.description}
                  onChange={(e) => setValues({ ...values, description: e.target.value })}
                  className="w-full h-20 rounded border border-slate-300 bg-transparent py-3 px-5 outline-none"
                />
              </div>


              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">Content</label>
                <JoditWrapper
                  config={editorConfig}
                  value={values.content}
                  onChange={(value) => setValues({ ...values, content: value })}
                />
              </div>

    
              <div className="flex justify-end gap-4.5">
                <button
                  type="button"
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center rounded bg-orange-500 text-white py-2 px-6 font-medium"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
