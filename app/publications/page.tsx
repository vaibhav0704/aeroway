import PublicationsClient from "./publication-client";


export const metadata = {
  title: "Publication | Aeroway.one",
  description:
    "Stay updated with Aeroway’s monthly aviation and space magazine.",
  keywords:
    "Aeroway Publications, Aviation Magazines, Aerospace Insights",
  openGraph: {
    title: "Publication | Aeroway.one",
    description:
      "Stay updated with Aeroway’s monthly aviation and space magazine.",
  },
};

export default function PublicationsPage() {
  return <PublicationsClient />;
}
