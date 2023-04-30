import Header from '@/components/Header';
import Login from '@/components/login';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.scss';
import customer1 from '../../../public/assets/customer1.gif';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function Customer() {
  const { isLoggedIn } = useSelector((state) => state.cabReducer);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('namma_data') !== null) {
      router.push('/dashboard/customer');
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <Header user={'customer'} />
      </div>
      <div className={styles.container__body}>
        <div className={styles.container__logSign}>
          <div className={styles.container__images}>
            <Image alt={'customer'} src={customer1} width={400} height={400} />
          </div>
          <Login user={'customer'} />
        </div>
      </div>
    </div>
  );
}

export default Customer;
