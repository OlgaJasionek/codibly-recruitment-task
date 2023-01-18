import Head from "next/head";

import MainComponent from "../components/main-component/Main";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Task to application</title>
        <meta name='description' content='task to application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <MainComponent />
      </main>
    </>
  );
};

export default HomePage;
