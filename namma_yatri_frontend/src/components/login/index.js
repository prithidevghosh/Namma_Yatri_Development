import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/stores/cabBook';

function Login({ user }) {
  const [phone, setPhone] = useState(91);
  const [password, setPassword] = useState('');
  const [empty, setEmpty] = useState([]);

  // const {errorMessage} = useSelector(state => state.cabReducer)

  const checkForm = () => {
    setTimeout(() => {
      setEmpty([]);
    }, 1500);
    if (!phone && !isNaN(phone)) {
      setEmpty([...empty, 'phone']);
      return false;
    } else if (!password) {
      setEmpty([...empty, 'password']);
      return false;
    }
    if (phone.length !== 12) {
      setEmpty([...empty, 'phone']);
      return false;
    }

    return true;
  };
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      "contact":phone,
      "password":password
    }
    if(checkForm()){
      dispatch(login(user, payload))
    }

  }

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>{user} Login</h1>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <label htmlFor="phone" className={`${styles.login__label}  ${empty.includes('phone') && styles.login__empty}`}>Phone Number:</label>
        <input type="number" id="phone" name="phone" value={phone} className={`${styles.login__input}`} placeholder='phone number' onChange={(event) =>{(!isNaN(event.target.value))? setPhone(event.target.value):null}} />

        <label htmlFor="password" className={`${styles.login__label}  ${empty.includes('password') && styles.login__empty}`}>Password:</label>
        <input type="password" id="password" name="password" value={password} className={`${styles.login__input}`} placeholder='password' onChange={(event) => setPassword(event.target.value)} />
        <button type="submit" className={styles.login__button}>Login</button>
      </form>
      <Link href={`/signup/${user}`} className={styles.login__link}>New user? Sign up here</Link>
    </div>
  );
}

export default Login;
