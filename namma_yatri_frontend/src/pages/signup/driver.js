import Header from '@/components/Header';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.scss';
import customer1 from '../../../public/assets/customer1.gif';
import Signup from '@/components/signup';
import { useRouter } from 'next/router';

function Driver() {
  // const { isLoggedIn } = useSelector((state) => state.cabReducer);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('namma_data') !== null) {
      router.push('/dashboard/driver');
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <Header user={'driver'} />
      </div>
      <div className={styles.container__body}>
        <div className={styles.container__logSign}>
          <div className={styles.container__images}>
            <Image alt={'driver'} src={customer1} width={400} height={400} />
          </div>
          <Signup user={'driver'} />
        </div>
      </div>
    </div>
  );
}

export default Driver;
