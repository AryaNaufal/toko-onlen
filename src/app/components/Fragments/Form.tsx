import { redirect } from 'next/navigation';
import Style from './Form.module.css'

import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
const Form = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [email, setEmail] = useState<string>('');
  const [capVal, setCapVal] = useState<string | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(capVal);
    if(!capVal) return alert('Captcha is required');
    // redirect('/');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      <ReCAPTCHA
        sitekey='6Lepm9UpAAAAAGicQkWtrUl970c2ML7F7zeVdigo'
        onChange={(val) => setCapVal(val)}
        // ref={captchaRef}
      />
      <button className='bg-emerald-500 text-white p-3'>Submit</button>
    </form>
  )
}

export default Form