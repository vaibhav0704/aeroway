"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { RootState, AppDispatch } from "@/redux/store";
import Breadcrumb from "../components/bread-crumb";
import { fetchMagazines } from "@/redux/slices/magazineSlice";

const MagazinesTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const magazines = useSelector((state: RootState) => state.magazines.magazines);

  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMagazines());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions);
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this magazine?")) return;

    try {
      const res=await axios.delete(`/api/magazine/delete/${id}`);
      if(res?.data?.success){
         toast.success("Magazine deleted successfully!");
      }
      dispatch(fetchMagazines());
    } catch (err) {
      toast.error("Failed to delete magazine.");
    }
  };

  if (loading) return <div>Loading...</div>;


  const displayedMagazines = magazines.slice(0, visibleCount);

  return (
    <div className="grid grid-cols-1 gap-6 mx-4 lg:mx-20 my-6">
      <Breadcrumb pageName="Magazines" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm shadow-md bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark sm:px-7.5">

          <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
            Total Magazines: {magazines.length}
          </h4>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4">S.no</th>
                  <th className="py-4 px-4">Image</th>
                  <th className="py-4 px-4">Title</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayedMagazines.map((mag, index) => (
                  <tr key={mag.idMagazines}>
                    <td className="py-5 px-4 shadow-md ">{index + 1}</td>

                    <td className="py-5 px-4 shadow-md">
                      <div className="h-12.5 w-15 rounded-md overflow-hidden">
                        <img src={mag.magazine_cover_image} alt="Magazine" />
                      </div>
                    </td>

                    <td className="py-5 px-4 shadow-md ">
                      <h5>{mag.magazine_title}</h5>
                    </td>

                    <td className="py-5 px-4 shadow-md ">
                      {formatDate(mag.formatted_date)}
                    </td>

                    <td className="py-5 px-4 shadow-md">
                      <div className="flex  items-center space-x-3.5">
                        <Link className="text-blue-500" href={`/publications/${mag.magazine_slug}`}>
                          View
                        </Link>

                        <Link href={`/admin/dashboard/magazines/edit/${mag.magazine_slug}`}
                        className="text-orange-500">Edit
                        </Link>

                        <button
                          className="hover:text-primary cursor-pointer text-red-500"
                          onClick={() => handleDelete(String(mag.magazine_id))}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          {visibleCount < magazines.length && (
            <div className="flex justify-center py-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2 cursor-pointer bg-orange-400 text-white rounded-lg hover:bg-primary/90"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagazinesTable;
