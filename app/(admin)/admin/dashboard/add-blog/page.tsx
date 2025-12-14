"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { RootState, AppDispatch } from "@/redux/store";
import JoditWrapper from "../components/jodit-wrapper";
import Breadcrumb from "../components/bread-crumb";
import axios from "axios";
import { toast } from "sonner";

interface Category {
  category_id: number;
  category_name: string;
  category_slug: string;
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

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;

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
  uploader: {
    insertImageAsBase64URI: true,
  },
  width: 1400,
  minHeight: 542,
  controls: {
    font: {
      command: "fontname",
      list: {
        "'Open Sans',sans-serif": "Open Sans",
        "Helvetica,sans-serif": "Helvetica",
        "Arial,Helvetica,sans-serif": "Arial",
        "Georgia,serif": "Georgia",
        "Impact,Charcoal,sans-serif": "Impact",
        "Tahoma,Geneva,sans-serif": "Tahoma",
        "'Times New Roman',Times,serif": "Times New Roman",
        "Verdana,Geneva,sans-serif": "Verdana",
        "Consolas,monaco,monospace": "Consolas",
      },
    },
  },
};

const FormLayout = () => {
  const dispatch = useAppDispatch();
  const categoriesData = useAppSelector(
    (state) => state.categories.categories
  ) as Category[];
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const userId = useAppSelector(
    (state) => (state.auth as any).adminId as number
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValues({ ...values, featureImage: file || "" });

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedFormats = ["jpeg", "jpg", "png", "webp"];

      if (fileExtension && allowedFormats.includes(fileExtension)) {
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Invalid featureImage format. Please upload a JPEG, JPG, PNG, or WebP file."
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return;

  if (!values.title.trim()) {
    toast.error("Title is required");
    return;
  }
  if (!values.tag.trim()) {
    toast.error("Tag is required");
    return;
  }
  if (!values.featureImage) {
    toast.error("Feature Image is required");
    return;
  }
  if (!values.category) {
    toast.error("Category is required");
    return;
  }
  if (!values.date) {
    toast.error("Date is required");
    return;
  }
  if (!values.time) {
    toast.error("Time is required");
    return;
  }
  if (!values.description.trim()) {
    toast.error("Description is required");
    return;
  }
  if (!values.content.trim()) {
    toast.error("Content is required");
    return;
  }

  setIsSubmitting(true);

  const formData = new FormData();

  formData.append("blog_title", values.title);
  formData.append("blog_tag", values.tag);
  formData.append("blog_category_id", values.category);
  formData.append("blog_description", values.description);
  formData.append("blog_content", values.content);
  formData.append("blog_publisher_id", String(values.publisher));
  formData.append("blog_date", values.date);
  formData.append("blog_time", values.time);

  if (values.featureImage instanceof File) {
    formData.append("blog_feature_image", values.featureImage);
  }

  try {
    const response = await axios.put("/api/blogs/add", formData);
    toast.success("Blog added successfully.");
  } catch (err) {
    console.error("Error submitting blog", err);
  }
  setValues({
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
  setIsSubmitting(false);
};


  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  return (
    <>
      <div className="grid grid-cols-1 gap-9 mx-4 lg:mx-20 my-6 ">
        <Breadcrumb pageName="Add Blog" />
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border-orange-500 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Post Form
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      value={values.title}
                      onChange={(e) =>
                        setValues({ ...values, title: e.target.value })
                      }
                      className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Enter tags"
                      value={values.tag}
                      onChange={(e) =>
                        setValues({ ...values, tag: e.target.value })
                      }
                      className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="mb-4.5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Feature Image
                      </label>
                      <input
                        type="file"
                        name="featureImage"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className=" w-full lg:w-[340px] rounded border-[1.5px] border-slate-300 bg-transparent py-2 px-5 font-medium outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      {errorMessage && (
                        <p className="text-primary text-sm mt-2">
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2.5 block text-black dark:text-white">
                        Blog Category
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          value={values.category}
                          onChange={(e) =>
                            setValues({ ...values, category: e.target.value })
                          }
                          className="relative z-20 w-full appearance-none rounded border border-slate-300 bg-transparent py-3 px-5 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="">Choose Category</option>
                          {categoriesStatus === "loading" && (
                            <option disabled>Loading...</option>
                          )}
                          {categoriesStatus === "succeeded" &&
                            categoriesData.map((cate, index) => (
                              <option key={index} value={cate.category_id}>
                                {cate.category_name}
                              </option>
                            ))}
                          {categoriesStatus === "failed" && (
                            <option disabled>Error loading categories</option>
                          )}
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className=" w-full lg:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Date
                        </label>
                        <input
                          type="Date"
                          value={values.date}
                          onChange={(e) =>
                            setValues({ ...values, date: e.target.value })
                          }
                          className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          value={values.time || "09:00"}
                          onChange={(e) =>
                            setValues({ ...values, time: e.target.value })
                          }
                          className="w-full rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          name="time"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enter Description
                  </label>
                  <textarea
                    value={values.description}
                    onChange={(e) =>
                      setValues({ ...values, description: e.target.value })
                    }
                    className="w-full h-20 rounded border border-slate-300 bg-transparent py-3 px-5 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Content
                  </label>

                  <JoditWrapper
                    config={editorConfig}
                    value={values.content}
                    onChange={(value) =>
                      setValues({ ...values, content: value })
                    }
                  />
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-orange-500 text-white py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
