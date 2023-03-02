import { type NextPage } from "next";
import Link from "next/link";

import Title from "../components/title";

const Home: NextPage = () => {
  return (
    <>
      <h1>Welcomt to the Sample App</h1>
      <h2>
        This is the home page for the{" "}
        <a href="https://railstutorial.jp/">Ruby on Rails Tutorial</a>
        sample application.
      </h2>
      <Link href="#">Sign up now!</Link>
    </>
  );
};

export default Home;
