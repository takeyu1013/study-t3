import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="pt-[9px]">
      <div className="rounded-md bg-[#eeeeee] py-12 px-16 text-center">
        <h1 className="pt-5 text-[63px] font-medium leading-none tracking-[-2px] text-[#333333]">
          Welcome to the Sample App
        </h1>
        <h2 className="pt-5 pb-8 leading-none tracking-[-1px] text-neutral-500">
          This is the home page for the{" "}
          <a
            className="text-[#337ab7] hover:text-[#23527c] hover:underline"
            href="https://railstutorial.jp/"
          >
            Ruby on Rails Tutorial{" "}
          </a>
          sample application.
        </h2>
        <Link
          href="#"
          className="inline-block rounded-md border border-[#2e6da4] bg-[#337ab7] px-4 py-[10px] text-lg leading-6 text-white hover:border-[#204d74] hover:bg-[#286090]"
        >
          Sign up now!
        </Link>
      </div>
      <div className="pt-[30px] pb-[45px]">
        <a href="https://rubyonrails.org/">
          <Image
            alt="Rails logo"
            width={200}
            height={70}
            src="https://cdn.learnenough.com/rails.svg"
            className="inline"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;
