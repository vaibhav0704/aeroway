import ClientPage from "./clientPage";


const Page = async ({params,
}: {
  params: Promise<{ blog_slug: string }>; }) => {
  const { blog_slug } = await params;

  return <ClientPage blog_slug={blog_slug} />;
};

export default Page;
