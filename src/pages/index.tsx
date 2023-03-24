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
                Affordable Big IT & Technology Solutions<br />
                {/* <strong>Using code.</strong> */}
              </h2>
              <p>Bring On Monday, the innovative small business online accounting services that both you and your bottom line will love.</p>
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
            <Image src="/images/index.png" width="200" height="200" alt="" />
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
        <div className={styles.white}>

        </div>
        <footer className={styles.footer}>
          <div className={styles.footerLogo}>
            <Image src="/images/logo.png" width="80" height="80" alt='logo' />
            <p>
              Sed perspiciatis unde omnste natus error voluptatem accusanti doloreue audantium totamrem aeriam.
            </p>
          </div>
          <div>
            <div className={styles.footerTitle}>Newsletter</div>
            <p>Sed perspiciatis unde omnste natus error voluptatem accusante.</p>
            <div className={styles.footerTitle} style={{marginTop: '24px'}}>Follow Us</div>
          </div>
          <img className={styles.line} src="/images/footer-bg-line-shape.png" alt='logo' />
          <img className={styles.shape} src="/images/footer-right.png" alt='shape' />
        </footer>
        <div className={styles.copy}>
          <div style={{marginBottom: '8px'}}>Copyright © 2023.Steven Feng All rights reserved</div>
          <Link href="http://beian.miit.gov.cn/" target="_blank">
            蜀ICP备2023000864号-1
          </Link>
        </div>
      </main>
    </>
  )
}
