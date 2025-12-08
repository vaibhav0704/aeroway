import React from "react";
import Head from "next/head";

const Information: React.FC = () => {
  return (
    <>
      <Head>
        <title>Information Policy | Aeroway.one</title>
        <meta
          name="description"
          content="Explore Aeroway.one’s Information Policy for trusted content, transparency in practices, user guidelines, and regular updates."
        />
        <meta
          name="keywords"
          content="Information Policy, Aeroway Information Policy, Trusted Content Guidelines, Content Transparency, User Guidelines, Information Practices, Content Updates"
        />
        <meta property="og:title" content="Information Policy | Aeroway.one" />
        <meta
          property="og:description"
          content="Explore Aeroway.one’s Information Policy for trusted content, transparency in practices, user guidelines, and regular updates."
        />
      </Head>

      <main className=" flex flex-col items-center px-4 sm:px-6 lg:px-20 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-linear-to-r from-orange-900 via-orange-400 to-orange-200">
            Information Policy
          </h1>
        </div>

        <div className="bg-[#e8edf5] border border-slate-300/60 xl:max-w-6xl rounded-lg shadow-lg p-6 sm:p-10 xl:p-20">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Introduction</h2>
            <p className="mb-4 leading-relaxed text-slate-700 ">
              At Aeroway.one, our mission is to educate and inspire. As a proprietary Digital
              Information Platform (D.I.P.) owned by DO IT FOR ME LLC, we recognize the
              importance of transparency in our operations and how we manage and use the
              information you entrust to us. This Information Policy aims to detail our practices
              and commitments in relation to the content we produce and disseminate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Content Accuracy</h2>
            <ul className="list-disc list-inside space-y-3 ">
              <li>
                <strong>Information Verification:</strong> Every piece of information presented
                on our platform is thoroughly vetted and verified by our team of experts. We
                strive for accuracy and ensure that our content is backed by credible sources.
              </li>
              <li>
                <strong>Updates and Corrections:</strong> The aerospace and aviation industries
                are evolving rapidly. We regularly review our content and make updates as
                necessary to reflect the latest advancements and discoveries.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Intellectual Property Rights</h2>
            <ul className="list-disc list-inside space-y-3 ">
              <li>
                <strong>Ownership:</strong> All content on Aeroway.one, including text,
                graphics, images, and other materials, is the property of DO IT FOR ME LLC or
                its content suppliers and is protected by international copyright laws.
              </li>
              <li>
                <strong>Use of Content:</strong> Users are permitted to use the platform for
                their personal, non-commercial use. Reproduction, distribution, or modification
                of the content without explicit permission is strictly prohibited.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">User-Generated Content</h2>
            <ul className="list-disc list-inside space-y-3 ">
              <li>
                <strong>Monitoring and Moderation:</strong> Any content provided by our users,
                such as comments or reviews, may be subject to review. We reserve the right to
                remove any content that we deem inappropriate or not in line with our values and
                mission.
              </li>
              <li>
                <strong>User Responsibility:</strong> Users are responsible for the content they
                post. We encourage constructive and respectful dialogue. Users are advised not
                to share personal or sensitive information on the platform.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Sponsored Content and Affiliations</h2>
            <p className=" leading-relaxed">
              <strong>Disclosure:</strong> If any content is sponsored or affiliated, we will
              explicitly disclose this to our users. Our priority is to maintain transparency
              and trust with our community.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Feedback and Queries</h2>
            <p className=" leading-relaxed">
              We value the feedback of our community. If you have any suggestions, concerns, or
              queries regarding the content on our platform, please do not hesitate to reach
              out to us through our Contact Page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-[#4e658a]">Updates to This Information Policy</h2>
            <p className=" leading-relaxed">
              Like our Privacy Policy, our Information Policy is a living document. We may
              periodically make changes to reflect the evolution of our platform and the
              feedback of our community. We advise users to review this policy periodically
              for updates.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Information;
