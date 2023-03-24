/* eslint-disable */
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { useScroll } from '@/hooks/useScroll';
import Image from 'next/image';
import githubIcon from '@/static/image/github.png';
import Router from 'next/router';
import { getCookie, removeCookie } from '@/utils/cookie';
import { ArrowBackIcon, SettingsIcon, TriangleDownIcon } from '@chakra-ui/icons';
import Setting from '../Setting';

export default function HeadLayout() {
  const [userInfo, setUserInfo] = useState<any>('');
  const [show, setShow] = useState(false);
  const { myScrollTop } = useScroll();
  const toast = useToast();

  const toLogin = async () => {
    Router.push('/login');
  };

  const logout = () => {
    removeCookie('USER_INFO');
    removeCookie('TOKEN');
    setUserInfo('');
    toast({
      title: `Logout success!`,
      position: 'top',
      status: 'success',
      isClosable: true,
    });
  };
  const openSetting = () => {
    setShow(true);
  };
  const closeSetting = () => {
    setShow(false);
  };
  
  useEffect(() => {
    const user = getCookie('USER_INFO') ? JSON.parse(getCookie('USER_INFO') as string) : '';
    setUserInfo(user);
  }, []);
  
  return (
    <header>
      <div className={styles.header} style={{backgroundColor: myScrollTop > 100 ? 'rgba(15, 20, 37, 0.8)' : 'transparent' }}>
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
                  <MenuItem icon={<SettingsIcon />} onClick={openSetting}>Settings</MenuItem>
                  <MenuItem icon={<ArrowBackIcon />} onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )
          }
          {/* <Link href='https://github.com/fh332393900/Meet-frontend'>
            <Image className={styles.github} src={githubIcon} alt="githubicon"></Image>
          </Link> */}
        </div>
      </div>
      <Setting show={show} closeSetting={closeSetting}></Setting>
    </header>
  )
}