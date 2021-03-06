import Head from 'next/head';
import styles from './index.module.scss';

import { db } from 'config/firebase';
import Layout from 'components/Layout';
import Cards from '@/components/ProductCard/product-card';

import { useAuth } from '../firebase/context';

export default function Home({ data }) {
  const auth = useAuth();

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>eclipse</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <span className={styles.emoji}>🌙</span> New In
          </h1>
          <div className={styles.products}>
            {data.map((product) => {
              return (
                <Cards
                  key={product.id}
                  id={product.id}
                  data={data}
                  name={product.product_name}
                  image={product.cover_photo}
                  price={product.price}
                />
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
}

Home.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  await db
    .collection('Products')
    .get()
    .then(function (querySnapshot) {
      const products = querySnapshot.docs.map(function (doc) {
        return { id: doc.id, ...doc.data() };
      });
      data = products;
    })
    .catch((e) => (error = e));

  return {
    data,
    error,
    query,
  };
};
