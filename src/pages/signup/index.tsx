import { useState } from 'react';
import { 
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import { register } from '@/pages/api/user';
import { useToast } from '@chakra-ui/react';
import { setCookie } from '@/utils/cookie';
import Router from 'next/router';
import Head from 'next/head';
import styles from './signup.module.css';

export default function Login() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  }
  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }
  const isNameError = name === '';
  const isError = email === '';
  const isPasswordError = password === '';

  const signUp = async ()  => {
    if (isNameError || isError || isPasswordError) return;
    const params = {
      username: name,
      email,
      password,
      nickname: '',
      phone: 0,
      sex: 0,
      birthday: '',
      avatar: '',
    };
    setLoading(true);
    try {
      await register(params);
      setLoading(false);
      toast({
        title: `Sign Up success!`,
        position: 'top',
        status: 'success',
        isClosable: true,
      });
      toLogin();
    } catch (error) {
      setLoading(false);
    }
  }
  const toLogin = () => {
    Router.push('/login')
  };

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
            <h2 className={styles.title}>Get started in one minute.</h2>
            <FormControl className={styles.formLabel} isInvalid={isError}>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={name} onChange={handleNameChange} />
              {!isNameError ? '' : (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
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
              onClick={signUp}
              isLoading={loading}
              loadingText='Loading'
            >
                Sign Up
              </Button>
            <div className={styles.signUp}>
              Have an account? <span onClick={toLogin}>Log In →</span>
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