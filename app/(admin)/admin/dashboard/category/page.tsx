"use client";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";


import Breadcrumb from "../components/bread-crumb";
import axios from "axios";
import { toast } from "sonner";


type InputRef = React.MutableRefObject<HTMLInputElement | null>;


const CategoryForm = () => {
  
  const categoryRef: InputRef = useRef(null);

  
  const [category, setCategory] = useState("");

  
  const dispatch = useDispatch();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
     const response=await axios.post('/api/blogs/add-category',{category});
     console.log(response)
     toast.success(response.data.message);
      
      setCategory("");
      if (categoryRef.current) {
        categoryRef.current.focus();
      }
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <div className=" px-4 lg:px-20 flex flex-col gap-6 pt-6 min-h-screen" >
      <Breadcrumb pageName="Add Category" />
      <div>
        <div className="flex flex-col gap-9">
          
          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Category
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <input
                      placeholder="Add Category"
                      ref={categoryRef}
                      value={category} // Use state for value
                      onChange={(e) => setCategory(e.target.value)} // Update state on change
                      // Custom styles applied here:
                      className="relative z-20 w-full appearance-none rounded border-[1.5px] border-slate-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">

                   <button
                    className="flex justify-center rounded bg-primary py-2 px-6 border border-orange-500 font-medium text-gray hover:shadow-1 cursor-pointer"

                    disabled={!category.trim()} 
                  >
                    Cancle
                  </button>
                  <button
                    className="flex justify-center bg-orange-500 text-white rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 cursor-pointer"
                    type="submit"
                    disabled={!category.trim()} 
                  >
                    Add
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

export default CategoryForm;