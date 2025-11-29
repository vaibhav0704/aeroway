import CheckAuth from "./components/check-auth";
import Section2 from "./components/home/section2";
import Section3 from "./components/home/sections3";
import Text from "./components/home/text";

export default function Home() {
  return (
    <div className="flex flex-col p-6 md:p-10 xl:px-20 min-h-screen items-center justify-center bg-[#f9fbff] pt-8 xl:max-w-[4xl] text-justify gap-20 font-sans dark:bg-black">
      <Text />
      <section>
        <div>
          <h4
            className="text-4xl mb-4
             bg-linear-to-r from-orange-600 via-orange-200 to-orange-100
             text-transparent bg-clip-text"
          >
            Editor's picked
          </h4>
          <p className="text-gray-400 text-lg">
            Featured and highly rated articles
          </p>
        </div>
        <Section2 />
      </section>
      <section>
        <div className="flex-col gap-6 py-6">
          <h4
            className="text-4xl  mb-4
             bg-linear-to-r from-orange-600 via-orange-200 to-orange-100
             text-transparent bg-clip-text"
          >
            Recent posts
          </h4>
          <p className="text-gray-400 text-lg">Don't miss the latest trends</p>
        </div>

        <Section3 />
      </section>
      <section>
        <div>
          <h4
            className="text-4xl mb-4
             bg-linear-to-r from-orange-600 text-center via-orange-500 to-orange-200
             text-transparent bg-clip-text"
          >
            Quiz
          </h4>
          <p className="text-gray-400 text-lg">
            Test your knowledge and gain valuable insights
          </p>
        </div>
        {/* <Quiz/> */}
      </section>
      <CheckAuth/>
      {/* <DebugRedux /> */}
    </div>
  );
}
