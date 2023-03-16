import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { Button, useToast } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import styles from '@/styles/Home.module.css';
import Router from 'next/router';
import HeadLayout from '@/components/HeadLayout';
import { getCookie } from '@/utils/cookie';
import { createMeet } from './api/meet';
import { MeetNeedPassword } from '@/types/meet';

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  const start = () => {
    const isLogin = getCookie('TOKEN');
    isLogin ? quickCreate() : Router.push('/login');
  };

  const quickCreate = async () => {
    const params = {
      meetName: `${userInfo.username}'s Metting`,
      meetNeedPassword: MeetNeedPassword.NO,
      meetPassword: '',
    };
    setLoading(true);
    try {
      // const { data } = await createMeet(params);
      const meetId = 'bee24cdd-0d17-4d5d-8818-e18ba310f7e7';
      // Router.push(`/room/${data.meetId}`);
      Router.push(`/room/${meetId}`);
      setLoading(false);
    } catch (error) {
      toast({
        title: `Create Error!`,
        position: 'top',
        status: 'error',
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = getCookie('USER_INFO') ? JSON.parse(getCookie('USER_INFO') as string) : '';
    setUserInfo(user);
  }, []);
  
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
              <Button
                className={styles.btn}
                rightIcon={<ArrowForwardIcon />}
                colorScheme='messenger'
                isLoading={loading}
                onClick={start}
              >
                Get started
              </Button>
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
        <footer className={styles.footer}>
          © 2023 Meet
        </footer>
      </main>
    </>
  )
}
