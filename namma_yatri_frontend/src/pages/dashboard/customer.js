import React, { useEffect, useState } from 'react';
import styles from '@/styles/dashboard.customer.module.scss';
import booking from '../../../public/assets/booking.gif';
import showBooking from '../../../public/assets/showBooking.gif';
import pastBooking from '../../../public/assets/pastBooking.gif';
import nammaYatriLogo from '../../../public/assets/brand.svg';
import logoutIMG from '../../../public/assets/logoutIMG.png';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '@/stores/cabBook';

function Dashboard() {
    const [name, setName] = useState('');
    const { isLoggedIn } = useSelector((state) => state.cabReducer);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!isLoggedIn && localStorage.getItem('namma_data') === null) {
        router.push('/');
      }
    }, [isLoggedIn,router]);
  
    useEffect(() => {
      const nammaData = localStorage.getItem('namma_data');
      if (nammaData) {
        const customerData = JSON.parse(nammaData);
        setName(customerData.name);
        if (customerData.type !== 'customer') {
          router.push('/dashboard/driver');
        }
      } else {
        router.push('/');
      }
    }, [router]);
  
    useEffect(() => {
      const nammaData = localStorage.getItem('namma_data');
      if (typeof window !== 'undefined' && nammaData) {
        const customerData = JSON.parse(nammaData);
        setName(customerData.name);
      }
    }, []);
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <Image
          className={styles.container__logo}
          src={nammaYatriLogo}
          alt='nammaYatriLogo'
          width={300}
          height={300}
        />
        <div className={styles.container__logout}>
          <div className={styles.container__username}>{name}</div>
          <Image
            onClick={() => {
              handleLogout();
            }}
            src={logoutIMG}
            alt='logout'
            width={30}
            height={30}
          />
        </div>
      </div>
      <Link href='/createBooking' className={styles.link}>
        <div className={styles.container__card}>
          <Image alt='create' src={booking} width={300} height={300} />
          <div className={styles.container__label}>Create Booking</div>
        </div>
      </Link>
      <Link href='/login/customer' className={styles.link}>
        <div className={styles.container__card}>
          <Image alt='current' src={showBooking} width={300} height={300} />
          <div className={styles.container__label}>Current Booking</div>
        </div>
      </Link>
      <Link href='/login/customer' className={styles.link}>
        <div className={styles.container__card}>
          <Image alt='past' src={pastBooking} width={300} height={300} />
          <div className={styles.container__label}>Past Booking</div>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
