import { GetServerSideProps } from "next";
import Head from "next/head";

import {
  getProducts,
  GetProductsParams,
  GetProductsResponse,
} from "../common/api/api.service";

import MainComponent from "../components/main/Main";

export const getServerSideProps: GetServerSideProps = async context => {
  const data = await getProducts(context.query as GetProductsParams);

  return {
    props: {
      data,
    },
  };
};

const HomePage = (props: { data: GetProductsResponse }) => {
  return (
    <>
      <Head>
        <title>Codibly Recruitment Task</title>
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
