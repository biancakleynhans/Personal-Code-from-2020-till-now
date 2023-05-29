import React, { useEffect, useState } from 'react';
import { validateSignUpData } from '../../helpers/Validators';
import { iData, iError } from '../../models/Auth';

import Error from '../shared/alerts/ErrorInput';
import { useRouter } from 'next/router';
import InputComponent from '../shared/reusable/InputComponent';
import { ERROR } from '../../constants/Styling';

const SPACER = (
  <div className='flex items-center justify-between mt-4'>
    <span className='w-full border-b dark:border-primary-600' />
  </div>
);

interface iProps {
  // functions
  handleSignIn: () => void;
  handleSignUp: (email: string, pass: string, type: 'register' | 'login' | 'google') => void;

  // Ui
  UIcontainer: string;
  UIlabel: string;
  UIinput: string;
  UIsubmit: string;
  UIheader: string;
}
export default function SignUp(props: iProps) {
  const { UIcontainer, UIinput, UIlabel, UIsubmit, UIheader } = props;
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
    if (email.length < 8 || pass.length < 7 || errs.email || errs.password) {
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
        <InputComponent inputValue={email} type='email' handleChange={(val) => setemail(val)} labelText={'Email'} placeholder={'test@test.com'} />

        {/* PASSWORD */}
        <InputComponent type='password' inputValue={pass} handleChange={(val) => setpass(val)} labelText={'Password'} placeholder={'********'} />
        {/* SIGN UP BTN */}
        <div className='mt-6'>
          <button className={UIsubmit} disabled={disableSubmit()} onClick={() => props.handleSignUp(email, pass, 'register')}>
            Create Account
          </button>
        </div>
      </div>

      {SPACER}

      {/* CREATE */}
      <p className='mt-8 text-xs font-light text-center text-primary-400'>
        {' '}
        Already have an account?{' '}
        <button
          className='font-medium text-primary-700 dark:text-primary-200 hover:underline'
          onClick={() => {
            props.handleSignIn();
          }}
        >
          Log in
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
