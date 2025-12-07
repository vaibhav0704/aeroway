import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fbff] px-6 text-center">
      
      <Image
        src="/images/404.png"
        alt="404"
        width={250}
        height={250}
        className="mb-6"
      />

      <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
        404
      </h1>

      <p className="mt-3 text-lg text-gray-600 max-w-md">
        Oops! The page you are looking for does not exist or was moved.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-xl bg-linear-to-r from-orange-600 to-orange-400 text-white shadow-md hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
