import styles from './index.module.css';
import { Button, Link } from '@chakra-ui/react';
import { useScroll } from '@/hooks/useScroll';
import Image from 'next/image';
import githubIcon from '@/static/image/github.png';
import Router from 'next/router';

export default function HeadLayout() {
  const { myScrollTop } = useScroll();
  const toLogin = async () => {
    Router.push('/login');
  }
  
  return (
    <header>
      <div className={styles.header} style={{backgroundColor: myScrollTop > 100 ? 'rgba(255, 255, 255, 0.8)' : 'transparent' }}>
        <div>Meet</div>
        <div className={styles.headerRight}>
          <Button colorScheme='teal' variant='outline' colorScheme='messenger' onClick={toLogin}>
            Log in
          </Button>
          <Link href='https://github.com/fh332393900/Meet-frontend'>
            <Image className={styles.github} src={githubIcon} alt="githubicon"></Image>
          </Link>
        </div>
      </div>
    </header>
  )
}