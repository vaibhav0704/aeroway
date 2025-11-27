
import Image from "next/image";
import Text from "./components/home/text";
import Section2 from "./components/home/section2";
import Section3 from "./components/home/sections3";
import DebugRedux from "./components/data";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Text/>
      <Section2/>
      <Section3/>
      <DebugRedux/>
     
    </div>
  );
}
