import React, { useEffect, useState } from 'react';
import { validateSignUpData } from '../../helpers/Validators';
import { iData, iError } from '../../models/Auth';

import { useRouter } from 'next/router';
import InputComponent from '../shared/reusable/InputComponent';

import Error from '../shared/alerts/ErrorInput';
import { ERROR } from '../../constants/Styling';

interface iProps {
  // functions
  handleForgot: (email: string) => void;
  handleSignIn: () => void;

  // Ui
  UIcontainer: string;
  UIlabel: string;
  UIinput: string;
  UIsubmit: string;
  UIheader: string;
}

export default function ForgotPassword(props: iProps) {
  const { UIcontainer, UIinput, UIlabel, UIsubmit, UIheader } = props;

  const [email, setemail] = useState<string>('');
  const [errs, seterrs] = useState<iError>({ email: '' } as iError);

  const router = useRouter();

  useEffect(() => {
    handleErrors();
  }, [email]);

  function handleErrors() {
    let data: iData = { email } as iData;
    const { valid, errors } = validateSignUpData(data);

    if (!valid) {
      // console.log('we have errors', errors, errs);

      if (errors.email !== errs.email) {
        seterrs({ ...errs, email: errors.email });
      }
    } else {
      seterrs({} as iError);
    }
  }

  function disableSubmit() {
    if (email.length < 8 || errs.email) {
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
        {/* Email */}
        <InputComponent type='email' inputValue={email} handleChange={(val) => setemail(val)} labelText={'Email'} placeholder={'test@test.com'} />

        {/* SIGN UP BTN */}
        <div className='mt-6'>
          <button className={UIsubmit} disabled={disableSubmit()} onClick={() => props.handleForgot(email)}>
            Get email to reset password
          </button>
        </div>
      </div>

      {/* CREATE */}
      <p className='mt-8 text-xs font-light text-center text-primary-400'>
        {' '}
        Go back to{' '}
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
