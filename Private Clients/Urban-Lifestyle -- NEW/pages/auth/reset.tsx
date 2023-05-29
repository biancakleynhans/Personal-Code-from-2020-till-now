/*
  RESETS USER LOG IN WHEN THE COME FROM THE EMAIL LINK TO RESET THEIR PASSWORD
  TODO: 
  THIS PAGE STILL NEEDS TO BE IMPLEMENTED AND FOR NOW IS ONLY A CONTAINED CHILD 
  WITH NO USABILITY BUILD INTO IT AS OF YET 
*/

import React from 'react';
import ResetPassword from '../../components/auth/ResetPassword';
import { CONTAINER_OUTER, HEADER, INPUT, LABEL, SUBMIT_BTN } from '../../constants/Styling';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  // const [password, setPassword] = useState<string>('');
  // const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  // const [toastMsg, setToastMsg] = useState<string>('Connecting to server please wait...');

  // function handleReset() {
  //   const oob: string | null = ''; //query.get('oobCode');
  //   const code: string = oob === null ? '' : oob;

  //   // // console.log(query.get("mode"), query.get("oobCode"));

  //   setisSubmitting(true);
  //   resetPassword(code, password)
  //     .then((res) => {
  //       // console.log('RES Suscess', res);
  //       setToastMsg('Email sent Sucesesfully, please check your email');
  //     })
  //     .catch((err) => {
  //       // console.log('ERROR', err.message);
  //       setToastMsg(err.message);
  //     })
  //     .finally(() => {
  //       setisSubmitting(false);
  //     });
  // }
  return (
    <div className='w-screen h-screen flex'>
      <ResetPassword
        UIheader={HEADER}
        UIcontainer={CONTAINER_OUTER}
        UIinput={INPUT}
        UIlabel={LABEL}
        UIsubmit={SUBMIT_BTN}
        handleReset={(oobCode: string, newPassword: string) => resetPassword(oobCode, newPassword)}
      />
    </div>
  );
}
