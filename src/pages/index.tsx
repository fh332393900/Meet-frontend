import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css';
import meetSvg from '@/stitic/meet.svg';

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
        <header>
          <div className={styles.header}>Meet</div>
        </header>
        <section>
          <div className={styles.description}>
            <div className={styles.descriptionText}>
              <h2>
                Read and display data from designs.<br />
                <strong>Using code.</strong>
              </h2>
              <p>Programmatically get data from Figma and four other design tools. All in an open-source Node.js SDK.</p>
              <Button className={styles.btn} colorScheme='messenger'>Get started</Button>
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
            <Image src={''} alt="11"></Image>
          </div>
        </section>
      </main>
    </>
  )
}
