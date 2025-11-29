import CategoryClientPage from "./categoryClientPage";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const category_name = decodeURIComponent(category)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="pt-10 bg-[#f9fbff] " >
      
            <CategoryClientPage category={category}/>
      
    </div>
  );
}
