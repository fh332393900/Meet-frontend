import Head from 'next/head';
import styles from './Login.module.css';

export default function Login() {
  return (
    <>
      <Head>
        <title>Meet</title>
        <meta name="description" content="Meet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.loginBox}>

        </div>
				<div className={styles.loginLogo}>
					<h2>The first dev toolkit to work with design data programatically</h2>
				</div>
      </main>
    </>
  )
}