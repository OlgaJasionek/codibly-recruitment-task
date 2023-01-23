import { GetServerSideProps } from "next";
import Head from "next/head";

import {
  getData,
  GetDataParams,
  GetDataResponse,
} from "../common/api/api.service";

import MainComponent from "../components/main-component/Main";

export const getServerSideProps: GetServerSideProps = async context => {
  const data = await getData(context.query as GetDataParams);

  return {
    props: {
      data,
    },
  };
};

const HomePage = (props: { data: GetDataResponse }) => {
  return (
    <>
      <Head>
        <title>Task to application</title>
        <meta name='description' content='task to application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <MainComponent data={props.data} />
      </main>
    </>
  );
};

export default HomePage;
