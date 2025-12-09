"use client";

import { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Breadcrumb from "../components/bread-crumb";
// import axios from 'axios'; // Removed as API logic is commented out/removed

// 1. Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false, // This is the key change: ensures Jodit is only loaded on the client side
});

// Import Jodit CSS globally or ensure it's handled in your root layout/setup
// For now, keep the import here if it's the only place it's used, but dynamic import helps avoid SSR issues.
import "jodit";
import { toast } from "sonner";
import axios from "axios";

interface FormValues {
  magazineTitle: string;
  tags: string;
  image: File | string; // File object for input, string for initial state
  date: string;
  category: string;
  MagCloudLink: string;
  PdfLink: string;
  description: string;
}

const editorConfig = {
  // ... (Your existing editorConfig remains the same)
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
  width: "auto",
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

const MagazinePostForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [values, setValues] = useState<FormValues>({
    magazineTitle: "",
    tags: "",
    image: "",
    date: "",
    category: "",
    MagCloudLink: "",
    PdfLink: "",
    description: "",
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setValues({ ...values, image });
      const fileExtension = image.name.split(".").pop()?.toLowerCase();
      const allowedFormats = ["jpeg", "jpg", "png", "webp"];

      if (fileExtension && allowedFormats.includes(fileExtension)) {
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Invalid image format. Please upload a JPEG, JPG, PNG, or WebP file."
        );

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        setValues((prev) => ({ ...prev, image: "" }));
      }
    } else {
      setValues((prev) => ({ ...prev, image: "" }));
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const requiredFields: Array<keyof FormValues> = [
      "magazineTitle",
      "tags",
      "image",
      "date",
      "MagCloudLink",
      "description",
    ];

    if (requiredFields.some((field) => values[field] === "")) {
      toast.error("Please fill in all necessary data");
      return;
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("magazineTitle", values.magazineTitle);
      formData.append("tags", values.tags);
      formData.append("date", values.date);
      formData.append("category", values.category);
      formData.append("MagCloudLink", values.MagCloudLink);
      formData.append("PdfLink", values.PdfLink);
      formData.append("description", values.description);

      
      if (values.image instanceof File) {
        formData.append("image", values.image);
      } else {
        toast.error("Invalid image file");
        return;
      }

      const res = await axios.post("/api/magazine/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Magazine saved successfully!");
      console.log(res.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
    setValues({
    magazineTitle: "",
    tags: "",
    image: "",
    date: "",
    category: "",
    MagCloudLink: "",
    PdfLink: "",
    description: "",
  })
  };

  const memoizedEditorConfig = useMemo(() => editorConfig, []);

  return (
    <div className="px-4 xl:px-20 flex flex-col gap-6 pt-6 min-h-screen">
      <Breadcrumb pageName="Post Magazines" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
       
          <div className="rounded-sm border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 py-4 px-6 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Post Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Magazine Title
                    </label>
                    <input
                      type="text"
                      name="magazineTitle"
                      id="magazineTitle"
                      placeholder="Enter title"
                      value={values.magazineTitle}
                      onChange={(e) =>
                        setValues({ ...values, magazineTitle: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Magazine Keywords
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      placeholder="Enter keywords"
                      value={values.tags}
                      onChange={(e) =>
                        setValues({ ...values, tags: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <div className="mb-4 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Feature Image
                        </label>
                        <input
                          type="file"
                          name="featureImage"
                          ref={imageInputRef}
                          onChange={handleImageChange}
                          className="w-full cursor-pointer rounded-lg border-2 border-gray-300 bg-transparent py-2 px-5 font-medium text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
                        />
                        {errorMessage && (
                          <p className="mt-2 text-sm text-red-500">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date
                        </label>
                        <input
                          type="date"
                          value={values.date}
                          onChange={(e) =>
                            setValues({ ...values, date: e.target.value })
                          }
                          className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-2.5 px-5 font-medium text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Category
                        </label>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          placeholder="Enter magazine's category"
                          value={values.category}
                          onChange={(e) =>
                            setValues({ ...values, category: e.target.value })
                          }
                          className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-2.5 px-5 font-medium text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Magcloud Link
                    </label>
                    <input
                      type="text"
                      id="MagcloudLink"
                      name="MagCloudLink"
                      placeholder="Paste Link here ...."
                      value={values.MagCloudLink}
                      onChange={(e) =>
                        setValues({ ...values, MagCloudLink: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      PDF Link
                    </label>

                    <input
                      type="text"
                      id="PdfLink"
                      name="PdfLink"
                      placeholder="Paste Link here ...."
                      value={values.PdfLink}
                      onChange={(e) =>
                        setValues({ ...values, PdfLink: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-300 bg-transparent py-3 px-5 text-gray-900 outline-none transition duration-150 focus:border-blue-500 active:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <JoditEditor
                    config={memoizedEditorConfig}
                    value={values.description}
                    onChange={(value) =>
                      setValues({ ...values, description: value })
                    }
                    // Apply Tailwind classes for theme consistency on the container
                    className="rounded-lg border-2 border-gray-300 focus-within:border-blue-500 dark:border-gray-600 dark:focus-within:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded-lg border border-gray-300 py-2 px-6 font-medium text-gray-900 transition duration-150 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    type="button" // Change to button type to prevent form submission on Cancel
                    onClick={() => {
                      console.log("Cancel button clicked");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex justify-center rounded-lg bg-blue-600 py-2 px-6 font-medium text-white transition duration-150 hover:bg-blue-700 ${
                      isSubmitting ? "cursor-not-allowed opacity-50" : ""
                    }`}
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
    </div>
  );
};

export default MagazinePostForm;
