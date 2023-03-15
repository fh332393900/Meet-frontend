import Head from "next/head";
import styles from './room.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicMeet = dynamic(() => import('./Meet'), { ssr: false });

export default function Room() {
  const router = useRouter();
  const { id } = router.query;

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
          {
            id ? <DynamicMeet roomId={id as string}></DynamicMeet> : '请输入会议ID'
          }
        </div>
      </main>
    </>
  );
}