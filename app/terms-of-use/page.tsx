// app/terms/page.tsx
import React from "react";
import Head from "next/head";

const Terms: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Use</title>
        <meta
          name="description"
          content="Aeroway.one’s Terms of Use outline site rules, user content rights, intellectual property policies, and updates for a seamless experience."
        />
        <meta
          name="keywords"
          content="Terms of Use, User Responsibilities, Site Policies, Content Usage Terms, Prohibited Activities, Governing Law, Website User Agreement, Aeroway Legal Terms"
        />
        <meta property="og:title" content="Terms of Use" />
        <meta
          property="og:description"
          content="Aeroway.one’s Terms of Use outline site rules, user content rights, intellectual property policies, and updates for a seamless experience."
        />
      </Head>

      <main className="px-4 flex flex-col items-center sm:px-6 lg:px-20 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-linear-to-r from-orange-900 via-orange-400 to-orange-200">Terms of Use</h1>
        </div>

        <div className=" bg-[#e8edf5] border border-slate-300 xl:max-w-6xl rounded-lg shadow-lg p-6 sm:p-10">
          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Acceptance of Terms</h2>
            <p className="leading-relaxed mb-4">
              By accessing and using the Aeroway.one website, you agree to comply with and be bound by these Terms of Use and our Privacy and Information Policies. If you do not agree to these terms, please refrain from using our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Use of Site</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Personal Use:</strong> The site is for your personal, non-commercial use. You may not modify, reproduce, distribute, or exploit any content without explicit written permission from DO IT FOR ME LLC.
              </li>
              <li>
                <strong>Prohibited Activities:</strong> You may not use the site for any unlawful purpose or to solicit others to perform illegal acts. This includes, but is not limited to, distributing malicious software, attempting unauthorized access, or violating intellectual property rights.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">User-Generated Content</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Content Responsibility:</strong> You are solely responsible for the content you post or share. We reserve the right to monitor, edit, or remove user content at our discretion.
              </li>
              <li>
                <strong>Content License:</strong> By posting or sharing content, you grant Aeroway.one a non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Intellectual Property</h2>
            <p className="leading-relaxed mb-4">
              All content on Aeroway.one, including text, graphics, logos, and images, is the property of DO IT FOR ME LLC and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Disclaimers</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Content Accuracy:</strong> While we strive for accuracy, we do not guarantee that the content on our site is error-free or current.
              </li>
              <li>
                <strong>External Links:</strong> The site may contain links to third-party websites. We do not endorse, and are not responsible for, the content, policies, or practices of these external sites.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Limitation of Liability</h2>
            <p className="leading-relaxed mb-4">
              DO IT FOR ME LLC and its subsidiaries, including Aeroway.one, shall not be held liable for any direct, indirect, consequential, or incidental damages resulting from the use or inability to use the site or its content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Changes to Terms of Use</h2>
            <p className="leading-relaxed mb-4">
              We may update these Terms of Use periodically. Changes will be effective immediately upon posting. By continuing to use the site after changes are posted, you agree to the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Governing Law</h2>
            <p className="leading-relaxed mb-4">
              These terms shall be governed by and construed according to the laws of [your jurisdiction/country], without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Contact Us</h2>
            <p className="leading-relaxed">
              For any questions or concerns regarding these Terms of Use, please contact us through our Contact Page.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Terms;
