"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { RootState, AppDispatch } from "@/redux/store";
import { editAdmin } from "@/redux/slices/adminSlice";
import Breadcrumb from "../components/bread-crumb";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((state: RootState) => state.admin);

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    bio: "",
  });

  useEffect(() => {
    if (admin.id) {
      setFormData({
        name: admin.name || "",
        number: admin.number?.toString() || "",
        bio: admin.bio || "",
      });
    }
  }, [admin]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/admin/update/${admin.id}`, formData, { withCredentials: true });
      if (res.status === 200) {
        dispatch(editAdmin(formData));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleSaveProfile = async () => {
    if (!file) return;

    const uploadForm = new FormData();
    uploadForm.append("image", file);

    try {
      const res = await axios.post(`/api/admin/update/profile-photo/${admin.id}`, uploadForm, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(editAdmin({ image: res.data.photoUrl }));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!admin.isAuthenticated) {
    return (
      <div>
        <div className="p-6 text-center text-red-500">You are not logged in.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl p-4 md:p-6 flex flex-col gap-10 mt-10">
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            <div className="rounded bg-white shadow-default dark:bg-boxdark">
              <div className="py-4 px-6">
                <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
              </div>
              <form className="p-6 space-y-6" onSubmit={handleUpdate}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-white">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded border border-slate-200 bg-gray-50 py-2 px-3 text-black focus:border-orange-500 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-black dark:text-white">Phone Number</label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="+123 4567 890"
                      className="w-full rounded border border-slate-200 bg-gray-50 py-2 px-3 text-black focus:border-orange-500 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={admin.email || ""}
                    disabled
                    className="w-full rounded border border-slate-200 bg-gray-50 py-2 px-3 text-black focus:border-orange-500 focus:ring-0 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-white">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your bio here..."
                    className="w-full rounded border border-slate-200 bg-gray-50 py-2 px-3 text-black focus:border-orange-500 focus:ring-0 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="reset"
                    onClick={() => setFormData({ name: admin.name || "", number: admin.number?.toString() || "", bio: admin.bio || "" })}
                    className="px-4 py-2 rounded bg-gray-100 text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded bg-orange-400 cursor-pointer text-white hover:bg-opacity-90">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="rounded bg-white shadow-default dark:bg-boxdark">
              <div className="py-4 px-6">
                <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={file ? URL.createObjectURL(file) : admin.image || "https://difm.s3-eu-central-2.ionoscloud.com/statics/dashboard/users.png"}
                      alt="User Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-black dark:text-white mb-1">Edit your photo</p>
                    <div className="flex gap-2 text-sm">
                      <button type="button" className="hover:text-primary" onClick={() => setFile(null)}>Delete</button>
                      <label className="hover:text-primary cursor-pointer">
                        Update
                        <input type="file" accept="image/*" className="hidden" onChange={handleChangeFile} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setFile(null)} className="px-4 py-2 rounded cursor-pointer bg-gray-100 text-black">
                    Cancel
                  </button>
                  <button type="button" onClick={handleSaveProfile} className="px-4 py-2 rounded bg-orange-400 cursor-pointer text-white hover:bg-opacity-90">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
