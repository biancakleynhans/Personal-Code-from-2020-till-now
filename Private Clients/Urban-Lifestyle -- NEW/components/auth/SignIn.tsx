import React, { useEffect, useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { iData, iError } from '../../models/Auth';
import { validateSignUpData } from '../../helpers/Validators';
import Error from '../shared/alerts/ErrorInput';
import { useRouter } from 'next/router';
import InputComponent from '../shared/reusable/InputComponent';
import { ERROR } from '../../constants/Styling';

const SPACER = (
  <div className='flex items-center justify-between mt-4'>
    <span className='w-1/5 border-b dark:border-primary-600 lg:w-1/5' />
    <div className='text-xs text-center text-primary-500 uppercase dark:text-primary-400 hover:underline'>or login with Social Media</div>
    <span className='w-1/5 border-b dark:border-primary-400 lg:w-1/5' />
  </div>
);

interface iProps {
  // functions
  handleForgot: () => void;
  handleSignUp: () => void;
  handleSignIn: (email: string, pass: string, type: 'register' | 'login' | 'google') => void;

  // Ui
  UIcontainer: string;
  UIlabel: string;
  UIinput: string;
  UIsubmit: string;
  UIgoogle: string;
  UIheader: string;
}

export default function SignIn(props: iProps) {
  const { UIcontainer, UIgoogle, UIinput, UIlabel, UIsubmit, UIheader } = props;
  const [email, setemail] = useState<string>('');
  const [pass, setpass] = useState<string>('');
  const [errs, seterrs] = useState<iError>({ email: '', password: '' } as iError);

  const router = useRouter();

  useEffect(() => {
    handleErrors();
  }, [email, pass]);

  function handleErrors() {
    let data: iData = { email, password: pass } as iData;
    const { valid, errors } = validateSignUpData(data);

    if (!valid) {
      // console.log('we have errors', errors, errs);

      if (errors.email !== errs.email) {
        seterrs({ ...errs, email: errors.email });
      }
      if (errors.password !== errs.password) {
        seterrs({ ...errs, password: errors.password });
      }
    } else {
      seterrs({} as iError);
    }
  }

  function disableSubmit() {
    if (email.length < 8 || pass.length < 7 || errs.email || errs.cell) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={UIcontainer}>
      <h1 className={UIheader}>{process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>

      {/* FORM */}
      <div className='mt-6'>
        {/* EMAIL */}
        <InputComponent type='email' inputValue={email} handleChange={(val) => setemail(val)} labelText={'Email'} placeholder={'test@test.com'} />

        {/* PASSWORD */}
        <InputComponent type='password' inputValue={pass} handleChange={(val) => setpass(val)} labelText={'Password'} placeholder={'********'} />

        {/* LOGIN BTN */}
        <div className='mt-6'>
          <button className={UIsubmit} disabled={disableSubmit()} onClick={() => props.handleSignIn(email, pass, 'login')}>
            Login
          </button>
        </div>
      </div>

      {SPACER}

      {/* GOOGLE */}
      <div className='flex items-center mt-6 -mx-2'>
        <button
          className={UIgoogle}
          onClick={() => {
            props.handleSignIn(email, pass, 'google');
          }}
        >
          <FcGoogle />
          <span className='hidden mx-2 sm:inline'>Sign in with Google</span>
        </button>
      </div>

      {/* CREATE */}
      <p className='mt-8 text-xs font-light text-center text-primary-400'>
        {' '}
        Don&apos;t have an account?{' '}
        <button
          className='font-medium text-primary-700 dark:text-primary-200 hover:underline'
          onClick={() => {
            props.handleSignUp();
          }}
        >
          Create One
        </button>
      </p>

      <p className='mt-8 text-xs font-light text-center text-primary-400'>
        {' '}
        Back to{' '}
        <button className='font-medium text-primary-700 dark:text-primary-200 hover:underline' onClick={() => router.push('/')}>
          Home page
        </button>
      </p>
    </div>
  );
}
