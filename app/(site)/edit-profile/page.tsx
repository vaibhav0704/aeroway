"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { editUserProfile } from "@/redux/action";

interface FormDataType {
  name: string;
  username: string;
  email: string;
  user_profile: File | string;
  profession: string;
  bio: string;
}

interface ErrorsType {
  [key: string]: string;
}

export default function Setting() {
  const dispatch = useDispatch<AppDispatch>();
  const fullData = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    username: "",
    email: "",
    user_profile: "",
    profession: "",
    bio: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsType>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFormData({
      name: fullData.name || "",
      username: fullData.username || "",
      email: fullData.email || "",
      user_profile: fullData.profile || "",
      profession: fullData.profession || "",
      bio: fullData.bio || "",
    });
  }, [fullData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? "" : "This field is required" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, user_profile: file }));

      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, user_profile: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorsType = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "bio" && key !== "user_profile" && !formData[key as keyof FormDataType]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Create FormData for multipart/form-data
      const data = new FormData();
      data.append("id", fullData.userId!);
      data.append("name", formData.name);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("profession", formData.profession);
      data.append("bio", formData.bio);

      if (formData.user_profile instanceof File) {
        data.append("profile", formData.user_profile);
      } else if (typeof formData.user_profile === "string") {
        data.append("profile", formData.user_profile);
      }

      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to update profile");

      // Optionally update Redux state
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: result });

      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Update profile error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <main className="container mx-auto py-14 mt-28 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
            <div className="relative">
              <img
                src={
                  avatarPreview ||
                  (fullData.profile
                    ? fullData.profile
                    : "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png")
                }
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-full ring-2 ring-indigo-300"
              />
              {avatarPreview && (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  X
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Update your profile</h2>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-300 text-white rounded-md hover:brightness-90 transition"
              >
                Change Avatar
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="profession" className="block mb-2 font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your profession"
              />
              {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block mb-2 font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write your bio here..."
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-300 text-white rounded-md hover:brightness-90 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
