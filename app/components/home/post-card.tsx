import Image from "next/image";

type BlogType = {
  blog_feature_image: string;
  blog_title: string;
  blog_description: string;
  formatted_date: string;
  blog_slug?: string; // useful for linking later
};

const PostCard = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="bg-white max-w-sm w-full mx-auto rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all">
      <div className="relative w-full h-48">
        <Image
          src={blog.blog_feature_image}
          alt={blog.blog_title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">{blog.blog_title}</h2>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {blog.blog_description}
        </p>

        <p className="text-gray-400 text-xs mt-3">
          {blog.formatted_date}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
