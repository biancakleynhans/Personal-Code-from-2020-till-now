import React, { useEffect, useState } from 'react';
import { SUBMIT_BTN } from '../../../constants/Styling';
import { iUser, iUserUpdate } from '../../../models/User';
import CardContainer from '../../shared/reusable/CardContainer';
import InputDisplayContainer from '../../shared/reusable/InputDisplayContainer';

interface iProps {
  currentUser: iUser;
  callBack: (uid: string, user: iUser, newData: iUserUpdate) => Promise<void>;
}

export default function ProfileComponent(props: iProps) {
  const [fn, setfn] = useState<string>(props.currentUser.fn);
  const [editfn, setEditfn] = useState<boolean>(false);
  const [ln, setln] = useState<string>(props.currentUser.ln);
  const [editln, setEditln] = useState<boolean>(false);
  const [cell, setcell] = useState<string>(props.currentUser.cell);
  const [editcell, setEditcell] = useState<boolean>(false);
  const [email, setemail] = useState<string>(props.currentUser.email);
  const [editemail, setEditemail] = useState<boolean>(false);

  useEffect(() => {}, [props]);

  useEffect(() => {
    disableSubmit();
  }, [email, fn, ln, cell]);

  function disableSubmit() {
    if (fn.length == 0 && ln.length === 0 && cell.length === 0 && email.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleDone() {
    let newInfo: iUserUpdate = { fn, ln, cell, email, profileImg: '', company: props.currentUser.company, fmcToken: '', addr: '', birthday: '', gender: '' };
    props
      .callBack(props.currentUser.uid, props.currentUser, newInfo)
      .then(() => {
        // setEditaddr(false);
        setEditcell(false);
        setEditemail(false);
        setEditfn(false);
        setEditln(false);
      })
      .catch(() => {});
  }

  return (
    <CardContainer isDark={true} width='w-[300px] ml-4 mr-2' title='Profile' subtitle='Your profile information. Click the edit button to update'>
      {/* Name */}
      <InputDisplayContainer labelString='First name' inputString={fn} type='text' isEdit={editfn} handleChange={(e) => setfn(e)} handleEdit={(e) => setEditfn(e)} />
      {/* Surname */}
      <InputDisplayContainer labelString='Last name' inputString={ln} type='text' isEdit={editln} handleChange={(e) => setln(e)} handleEdit={(e) => setEditln(e)} />
      {/* Cell */}
      <InputDisplayContainer labelString='Contact number' inputString={cell} type='tel' isEdit={editcell} handleChange={(e) => setcell(e)} handleEdit={(e) => setEditcell(e)} />
      {/* email */}
      <InputDisplayContainer labelString='Email' inputString={email} type='email' isEdit={editemail} handleChange={(e) => setemail(e)} handleEdit={(e) => setEditemail(e)} />

      {/* TODO:  */}
      {/* GENDER */}
      {/* BIRTHDATE */}
      <button className={SUBMIT_BTN} disabled={disableSubmit()} onClick={() => handleDone()}>
        Update Profile
      </button>
    </CardContainer>
  );
}
