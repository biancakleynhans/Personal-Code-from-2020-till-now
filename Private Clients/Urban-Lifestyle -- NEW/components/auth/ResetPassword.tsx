import React, { useEffect, useState } from 'react';
import { ERROR } from '../../constants/Styling';
import { validateSignUpData } from '../../helpers/Validators';
import { iData, iError } from '../../models/Auth';

import Error from '../shared/alerts/ErrorInput';
import InputComponent from '../shared/reusable/InputComponent';

const SPACER = (
  <div className='flex items-center justify-between mt-4'>
    <span className='w-full border-b dark:border-primary-600' />
  </div>
);

interface iProps {
  // functions
  handleReset: (email: string, pass: string) => void;

  // Ui
  UIcontainer: string;
  UIlabel: string;
  UIinput: string;
  UIsubmit: string;
  UIheader: string;
}
export default function ResetPassword(props: iProps) {
  const { UIcontainer, UIinput, UIlabel, UIsubmit, UIheader } = props;
  const [email, setemail] = useState<string>('');
  const [pass, setpass] = useState<string>('');

  const [errs, seterrs] = useState<iError>({ email: '', password: '' } as iError);

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
    if (pass.length < 7 || errs.password) {
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
        <InputComponent type='email' inputValue={email} handleChange={(val) => setemail(val)} labelText={'Email'} placeholder={'test@test.com'} />

        {/* PASSWORD */}
        <InputComponent type='password' inputValue={pass} handleChange={(val) => setpass(val)} labelText={'Password'} placeholder={'********'} />

        {/* SIGN UP BTN */}
        <div className='mt-6'>
          <button className={UIsubmit} disabled={disableSubmit()} onClick={() => {}}>
            Reset now
          </button>
        </div>
      </div>

      {SPACER}
    </div>
  );
}
