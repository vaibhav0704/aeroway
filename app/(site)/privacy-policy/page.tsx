// app/privacy/page.tsx
import React from "react";
import Head from "next/head";

const Privacy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Aeroway.one</title>
        <meta
          name="description"
          content="Learn how Aeroway.one protects your privacy. Discover what information we collect, how we use it, and your rights under our privacy policy."
        />
        <meta
          name="keywords"
          content="Privacy Policy, Aeroway.one Privacy Policy, Data Protection Policy, Personal Information Rights, Privacy and Data Security, User Privacy Guidelines"
        />
        <meta property="og:title" content="Privacy Policy | Aeroway.one" />
        <meta
          property="og:description"
          content="Learn how Aeroway.one protects your privacy. Discover what information we collect, how we use it, and your rights under our privacy policy."
        />
      </Head>

      <main className=" flex flex-col text-slate-900 items-center px-4 sm:px-6 lg:px-20 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-linear-to-r from-orange-900 via-orange-400 to-orange-200">Privacy Policy</h1>
        </div>

        <div className="bg-[#e8edf5] xl:max-w-6xl rounded-lg shadow-lg p-6 sm:p-10">
          <section className="mb-8 text-[#4e658a]">
            <h2 className="text-2xl  font-semibold mb-3">Introduction</h2>
            <p className="mb-4 leading-relaxed ">
              Welcome to Aeroway.one, a proprietary Digital Information Platform
              (D.I.P.) owned by DO IT FOR ME LLC ("we", "our", or "us"). We're
              committed to protecting your personal information and your right
              to privacy. If you have any questions or concerns about our policy
              or our practices with regard to your personal information, please
              contact us through our Contact Page.
            </p>
            <p className="mb-4 leading-relaxed">
              In this privacy policy, we seek to explain to you in the clearest
              way possible what information we collect, how we use it, and what
              rights you have concerning it. We hope you take some time to read
              through this carefully, as it is important. If there are any terms
              in this privacy policy that you do not agree with, please
              discontinue the use of our platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">
              Information We Collect
            </h2>
            <p className="mb-4 leading-relaxed">
              Our primary goal in collecting personal information is to provide
              you with a smooth, efficient, and customized experience. Here's
              how we do it:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Personal Information you disclose to us:</strong> We
                collect personal information that you voluntarily provide to us,
                which includes names, email addresses, postal addresses, phone
                numbers, and other related information.
              </li>
              <li>
                <strong>Information automatically collected:</strong> Some
                information, such as IP address and/or browser and device
                characteristics, is collected automatically when you visit our
                platform. This information helps us understand the user behavior
                and improve our platform.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-4 leading-relaxed">
              We use the personal information we collect from you for a variety
              of business purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>
                  To deliver and facilitate the delivery of services to the
                  user:
                </strong>{" "}
                We may use your information to provide you with the requested
                service.
              </li>
              <li>
                <strong>
                  To respond to user inquiries and offer support to users:
                </strong>{" "}
                If you reach out to us, we may use your personal information to
                respond.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">
              Will Your Information Be Shared with Anyone?
            </h2>
            <p className="leading-relaxed">
              We only share and disclose your information with your consent, to
              comply with laws, to provide you with services, to protect your
              rights, or to fulfill business obligations. We may also use your
              personal information to offer you products, services, and
              promotions offered by DO IT FOR ME LLC and its subsidiaries.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">
              How Do We Keep Your Information Safe?
            </h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security
              measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Your Privacy Rights</h2>
            <p className="leading-relaxed">
              You have certain rights with respect to your personal information,
              including the right to access, correct, or delete your personal
              information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">
              Updates to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this privacy policy from time to time in order to
              reflect changes to our practices or for other operational, legal,
              or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#4e658a] font-semibold mb-3">Contact Us</h2>
            <p className="leading-relaxed">
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please
              contact us via our Contact Page.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Privacy;
