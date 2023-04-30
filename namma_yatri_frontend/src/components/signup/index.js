import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { OTPGeneration, signup } from '@/stores/cabBook';

import styles from './index.module.scss';
import { useRouter } from 'next/router';

function Signup({ user }) {
  const [name, setName] = useState('');
  const [empty, setEmpty] = useState([]);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [license, setLicense] = useState('MH-01-20190012345');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { isOTPLoading, isSignedUp } = useSelector((state) => state.cabReducer);
  
  if(isSignedUp){
    router.push(`/login/${user}`)
  }
  const handleGenerateOTP = () => {
    let payload;
    setShowOTP(true);
    if (user === 'driver') {
      payload = {
        name: name,
        email: email,
        contact: '+91' + contact,
        password: parseInt(password),
        confirmPassword: parseInt(confirmPassword),
        license: license,
        carNumber: 'MH-12-AB-1234',
      };
    } else if (user === 'customer') {
      payload = {
        name: name,
        email: email,
        contact: '+91' + contact,
        password: parseInt(password),
        confirmPassword: parseInt(confirmPassword),
      };
    }
    console.log(payload, user);
    if (checkForm()) dispatch(OTPGeneration(user, payload));
  };

  const checkForm = () => {
    setTimeout(() => {
      setEmpty([]);
    }, 1500);
    if (!name) {
      setEmpty([...empty, 'name']);
      return false;
    } else if (!email) {
      setEmpty([...empty, 'email']);
      return false;
    } else if (!contact && !isNaN(contact)) {
      setEmpty([...empty, 'contact']);
      return false;
    } else if (!password) {
      setEmpty([...empty, 'password']);
      return false;
    } else if (!confirmPassword) {
      setEmpty([...empty, 'c-password']);
      return false;
    }
    if (contact.length !== 10) {
      setEmpty([...empty, 'contact']);
      return false;
    }

    if (password !== confirmPassword) {
      setEmpty([...empty, 'password', 'c-password']);
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!otp) {
      setEmpty([...empty, 'otp']);
      return;
    }
    let payload;
    if (user === 'driver') {
      payload = {
        name: name,
        email: email,
        contact: '+91' + contact,
        password: parseInt(password),
        confirmPassword: parseInt(confirmPassword),
        license: license,
        carNumber: 'MH-12-AB-1234',
        otp
      };
    } else if (user === 'customer') {
      payload = {
        name: name,
        email: email,
        contact: '+91' + contact,
        password: parseInt(password),
        confirmPassword: parseInt(confirmPassword),
        otp
      };
    }
    if(checkForm())
    dispatch(signup(user,payload));
  };

  return (
    <div className={styles.signup}>
      <h1 className={styles.signup__title}>{user} Sign Up</h1>
      <form className={styles.signup__form} onSubmit={handleSubmit}>
        <label
          htmlFor='name'
          className={`${styles.signup__label} ${
            empty.includes('name') ? styles.signup__label_error : ''
          }`}
        >
          Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your name'
          className={styles.signup__input}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label
          htmlFor='email'
          className={`${styles.signup__label} ${
            empty.includes('email') ? styles.signup__label_error : ''
          }`}
        >
          Email:
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          className={styles.signup__input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label
          htmlFor='contact'
          className={`${styles.signup__label} ${
            empty.includes('contact') ? styles.signup__label_error : ''
          }`}
        >
          Contact:
        </label>
        <input
          type='tel'
          id='contact'
          name='contact'
          placeholder='Enter your phone number'
          className={styles.signup__input}
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />

        <label
          htmlFor='password'
          className={`${styles.signup__label} ${
            empty.includes('password') ? styles.signup__label_error : ''
          }`}
        >
          Password:
        </label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          className={styles.signup__input}
          value={password}
          onChange={(event) => {
            !isNaN(event.target.value) ? setPassword(event.target.value) : null;
          }}
        />

        <label
          htmlFor='confirm-password'
          className={`${styles.signup__label} ${
            empty.includes('c-password') ? styles.signup__label_error : ''
          }`}
        >
          Confirm Password:
        </label>
        <input
          type='password'
          id='confirm-password'
          name='confirm-password'
          placeholder='Re-enter your password'
          className={styles.signup__input}
          value={confirmPassword}
          onChange={(event) => {
            !isNaN(event.target.value)
              ? setConfirmPassword(event.target.value)
              : null;
          }}
        />

        {user === 'driver' && (
          <>
            <label
              htmlFor='license'
              className={`${styles.signup__label} ${
                empty.includes(license) ? styles.signup__label_error : ''
              }`}
            >
              Driver License Number:
            </label>
            <input
              type='text'
              id='license'
              name='license'
              placeholder='Enter your DL number'
              className={styles.signup__input}
              value={license}
              onChange={(event) => setLicense(event.target.value)}
            />
          </>
        )}

        {password.length !== 0 &&
          name.length !== 0 &&
          email.length !== 0 && confirmPassword.length !== 0 &&
          !showOTP && (
            <button
              className={styles.signup__otp}
              onClick={() => handleGenerateOTP()}
            >
              Send OTP
            </button>
          )}
        {showOTP && !isOTPLoading && (
          <>
            <label
              htmlFor='otp'
              className={`${styles.signup__label} ${
                empty.includes('otp') ? styles.signup__label_error : ''
              }`}
            >
              OTP:
            </label>
            <input
              type='text'
              id='otp'
              name='otp'
              placeholder='Enter OTP sent to your phone'
              className={styles.signup__input}
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          </>
        )}

        <button type='submit' className={styles.signup__button}>
          Signup
        </button>
      </form>
      <Link href={`/login/${user}`} className={styles.signup__link}>
        Already have an account? Login here
      </Link>
    </div>
  );
}

export default Signup;
