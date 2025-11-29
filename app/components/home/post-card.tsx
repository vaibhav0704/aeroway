import Image from "next/image";
import Link from "next/link";

type BlogType = {
  blog_feature_image: string;
  blog_title: string;
  blog_description: string;
  formatted_date: string;
  category_name: string;
  blog_slug:string
};

const PostCard = ({ blog }: { blog: BlogType }) => {
  return (
    <Link href={`/${blog.blog_slug}`} >
      <div className="bg-slate-300/20 p-6 max-w-md w-full mx-auto  shadow-lg overflow-hidden hover:scale-[1.02] transition-all">
        <div className="relative w-full h-fit aspect-square py-10 ">
          <Image
            src={blog.blog_feature_image}
            alt={blog.blog_title}
            fill
            className="object-cover w-full h-auto rounded-t-2xl"
          />
        </div>

        <div className="p-4">
          <p>{blog.category_name}</p>
          <h2 className="text-lg text-gray-600 text-justify font-bold">
            {blog.blog_title}
          </h2>

          <div className="flex justify-between">
            <div className="flex items-center gap-3 mt-4">
              {/* ICON IMAGE FIXED */}
              <div className="relative w-14 h-14">
                <Image
                  src="/images/fevicon.png"
                  alt="fevicon"
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <div className="leading-tight">
                <h6 className="font-semibold">Aeroway ONE</h6>
                <p className="text-gray-400 text-xs mt-1">
                  {blog.formatted_date}
                </p>
              </div>
            </div>

            <button className="block mt-3 underline pt-6">
              Read more
            </button>
          </div>
        </div>
      </div>{" "}
    </Link>
  );
};

export default PostCard;
