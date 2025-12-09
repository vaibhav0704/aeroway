"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  pageName?: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const pathname = usePathname();


  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "");


  const current = pageName || segments[segments.length - 1] || "Dashboard";

  return (
    <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-semibold text-black dark:text-white">
        {current}
      </h2>

      <nav>
        <ol className="flex items-center gap-2 text-xl">
          <li>
            <Link className="font-medium" href="/admin/dashboard">
              Dashboard /
            </Link>
          </li>

          <li className="font-medium text-primary text-orange-600">
            {current}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
