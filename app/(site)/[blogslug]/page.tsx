import ClientPage from "./clientPage";


export default async function Page({params,
}: {
  params: Promise<{ blogslug: string }>; }) {
    const {blogslug}=await params;



  return <ClientPage blogslug={(await params).blogslug} />;
}
