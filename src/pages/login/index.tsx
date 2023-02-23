import { useState } from 'react';
import { 
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import { userLogin } from '@/pages/api/meet';
import { useToast } from '@chakra-ui/react';
import Router from 'next/router';
import Head from 'next/head';
import styles from './Login.module.css';

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const isError = email === '';
  const isPasswordError = password === '';

  const login = async ()  => {
    const params = {
      username: email,
      password,
    };
    try {
      const { data } = await userLogin(params);
      toast({
        title: `Login success!`,
        position: 'top',
        status: 'success',
        isClosable: true,
      });
      Router.back();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className={styles.formBox}>
            <h2 className={styles.title}>Welcome back!</h2>
            <FormControl className={styles.formLabel} isInvalid={isError}>
              <FormLabel>Email</FormLabel>
              <Input type='email' value={email} onChange={handleInputChange} />
              {!isError ? '' : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl className={styles.formLabel} isInvalid={isPasswordError}>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={password} onChange={handlePasswordChange} />
              {!isPasswordError ? '' : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
            <Button
              className={styles.loginBtn}
              colorScheme='messenger'
              onClick={login}
            >
                Log in
              </Button>
            <div className={styles.signUp}>
              Don’t have an account? <span>Sign Up here →</span>
            </div>
          </div>
        </div>
				<div className={styles.loginLogo}>
					<h2>The first dev toolkit to work with design data programatically</h2>
				</div>
      </main>
    </>
  )
}