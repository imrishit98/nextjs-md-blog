import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';
import axios from 'axios';

export default function Product({ apiRes }) {
  const { isFallback } = useRouter();
  const testData = JSON.stringify(apiRes);
  return (
    <Layout>
      {isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Head>
            <title>{apiRes.ASIN}</title>
          </Head>

          <article>
            <h1 className={utilStyles.headingXl}>{apiRes.ASIN}</h1>
            <code>{testData}</code> <br />
            <a href={apiRes.DetailPageURL}>{apiRes.ASIN}</a> <br />
            <Image
              src={apiRes.Images.Primary.Large.URL}
              alt='Picture of the product'
              width={apiRes.Images.Primary.Large.Width}
              height={apiRes.Images.Primary.Large.Height}
            />
          </article>
        </>
      )}
    </Layout>
  );
}

/* function getAllProdIds() {
  const productIds = ['B08BSDNKH6', 'B01B2BMIMS'];
  return productIds.map((prodId) => {
    return {
      params: {
        id: prodId,
      },
    };
  });
} */

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const resp1 = await axios.get(
    `https://amazon-api-test.vercel.app/?prodId=${id}`
  );
  const apiRes = await resp1.data;

  return {
    props: {
      apiRes,
    },
  };
}
