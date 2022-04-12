import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from './product.module.scss';

import Layout from 'components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/Button';
import { useProduct } from 'hooks/product.hook';
import { db } from '@/config/firebase';

export default function Product({ data }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const { cover_photo, description, photos, price, product_name, sizes } = data;

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img src={photos[selectedPhoto]} loading="lazy" />
            </div>
            <div className={styles.smallPhotos}>
              {photos.slice(0, 5).map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    className={styles.smallPhoto}
                    style={{ borderColor: selectedPhoto === index && 'black' }}
                    onClick={() => setSelectedPhoto(index)}
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.productInfos}>
            <div className={styles.header}>
              <h1 className={styles.productTitle}>{product_name || ''}</h1>
              <Link href={`/${brand}`}>{brand || ''}</Link>
            </div>
            <span className={styles.priceText}>{price || 0}$</span>
            <hr />
            <div className={styles.sizes}>
              <h4 className={styles.sizesText}>Sizes</h4>
              {sizes.map((size) => {
                return (
                  <button
                    key={size}
                    className={styles.sizeButton}
                    style={{
                      borderColor: selectedSize === size && 'black',
                      fontWeight: selectedSize === size && 'bold',
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <hr />
            <div className={styles.buttons}>
              <Button style={{ margin: 0 }}>Add to Cart</Button>
            </div>
            <hr />
            <div className={styles.infoContainer}>
              <h4 className={styles.sizesText}>Product Information</h4>
              <p className={styles.infoText}>{description}</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

Product.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};
  await db
    .collection('Products')
    .doc(query.name)
    .get()
    .then(function (doc) {
      data = doc.data();
    })
    .catch((e) => (error = e));

  return {
    data,
    error,
    query,
  };
};