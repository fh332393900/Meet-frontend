import { useEffect } from 'react';
import { Link } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import styles from '@/styles/Home.module.css';
import Router from 'next/router';
import HeadLayout from '@/components/HeadLayout';

export default function Home() {

  return (
    <>
      <Head>
        <title>Meet</title>
        <meta name="description" content="Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeadLayout></HeadLayout>
        <section>
          <div className={styles.description}>
            <div className={styles.descriptionText}>
              <h2>
                Read and display data from designs.<br />
                <strong>Using code.</strong>
              </h2>
              <p>Programmatically get data from Figma and four other design tools. All in an open-source Node.js SDK.</p>
              <Button className={styles.btn} rightIcon={<ArrowForwardIcon />} colorScheme='messenger'>Get started</Button>
            </div>
            <img src="https://www.gstatic.com/meet/meet_google_one_carousel_promo_icon_0f14bf8fc61484b019827c071ed8111d.svg" alt="" />
          </div>
        </section>
        <section>
          <div className={styles.description}>
            <h2>
              Read and display data from designs.<br />
              <strong>Using code.</strong>
            </h2>
          </div>
        </section>
      </main>
    </>
  )
}
