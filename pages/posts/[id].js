import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Image from 'next/image';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import axios from 'axios';

export default function Post({ postData, apiRes }) {
  const testData = JSON.stringify(apiRes);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <code>{testData}</code> <br />
        <a href={apiRes.DetailPageURL}>{apiRes.ASIN}</a> <br />
        <Image
          src={apiRes.Images.Primary.Large.URL}
          alt='Picture of the product'
          width={apiRes.Images.Primary.Large.Width}
          height={apiRes.Images.Primary.Large.Height}
        />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const resp1 = await axios.get(
    `https://amazon-api-test.vercel.app/?prodId=${postData.test}`
  );
  const apiRes = await resp1.data;

  return {
    props: {
      postData,
      apiRes,
    },
  };
}
