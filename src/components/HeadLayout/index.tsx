/* eslint-disable */
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Avatar, Button, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useScroll } from '@/hooks/useScroll';
import Image from 'next/image';
import githubIcon from '@/static/image/github.png';
import Router from 'next/router';
import { getCookie, removeCookie } from '@/utils/cookie';
import { TriangleDownIcon } from '@chakra-ui/icons';

export default function HeadLayout() {
  const [userInfo, setUserInfo] = useState<any>('');
  const { myScrollTop } = useScroll();
  const toLogin = async () => {
    Router.push('/login');
  }

  const logout = () => {
    removeCookie('USER_INFO');
    removeCookie('TOKEN');
    setUserInfo('');
  }
  
  useEffect(() => {
    const user = getCookie('USER_INFO') ? JSON.parse(getCookie('USER_INFO') as string) : '';
    setUserInfo(user);
    console.log(userInfo);
  }, []);
  
  return (
    <header>
      <div className={styles.header} style={{backgroundColor: myScrollTop > 100 ? 'rgba(255, 255, 255, 0.8)' : 'transparent' }}>
        <div>Meet</div>
        <div className={styles.headerRight}>
          {
            !userInfo ? (
              <Button variant='outline' colorScheme='messenger' onClick={toLogin}>
                Log in
              </Button>
            ) : 
            (
              <Menu>
                <MenuButton>
                  <Button
                    className={styles.userName}
                    variant='outline'
                    rightIcon={<TriangleDownIcon w={3} h={3} />}
                  >{ userInfo.username }</Button>
                </MenuButton>
                <MenuList>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )
          }
          <Link href='https://github.com/fh332393900/Meet-frontend'>
            <Image className={styles.github} src={githubIcon} alt="githubicon"></Image>
          </Link>
        </div>
      </div>
    </header>
  )
}