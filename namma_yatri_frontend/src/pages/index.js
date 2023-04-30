import React, { useEffect } from 'react';
import styles from '@/styles/index.module.scss';
import driver from '../../public/assets/driver.gif';
import customer from '../../public/assets/customer.gif';
import Image from 'next/image';
import Link from 'next/link';
import nammaYatriLogo from '../../public/assets/nammaYatrilogo.svg';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function index() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.cabReducer);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem('namma_data') !== null) {
      const nammaData = localStorage.getItem('namma_data');
      const userType = JSON.parse(nammaData);
      router.push(`/dashboard/${userType.type}`);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <Image
          src={nammaYatriLogo}
          alt='nammaYatriLogo'
          width={300}
          height={300}
        />
      </div>
      <Link href='/login/driver' className={styles.link}>
        <div className={styles.container__card}>
          <Image alt='driver' src={driver} width={300} height={300} />
          <div className={styles.container__label}>Driver</div>
        </div>
      </Link>
      <Link href='/login/customer' className={styles.link}>
        <div className={styles.container__card}>
          <Image alt='customer' src={customer} width={300} height={300} />
          <div className={styles.container__label}>Customer</div>
        </div>
      </Link>
    </div>
  );
}
