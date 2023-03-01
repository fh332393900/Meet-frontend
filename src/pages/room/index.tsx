import Head from "next/head";
import styles from './room.module.css';
import dynamic from 'next/dynamic'

const DynamicMeet = dynamic(() => import('./Meet'), { ssr: false });

export default function Room() {

  return (
    <>
      <Head>
        <title>Meet</title>
        <meta name="description" content="Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.box}>
          <DynamicMeet></DynamicMeet>
        </div>
      </main>
    </>
  );
}