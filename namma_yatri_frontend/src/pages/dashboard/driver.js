import React, { useEffect, useState } from 'react';
import styles from '@/styles/dashboard.driver.module.scss';
import nammaYatriLogo from '../../../public/assets/brand.svg';
import logoutIMG from '../../../public/assets/logoutIMG.png';
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
  }, [isLoggedIn, router]);

  useEffect(() => {
    const nammaData = localStorage.getItem('namma_data');
    if (nammaData) {
      const customerData = JSON.parse(nammaData);
      setName(customerData.name);
      if (customerData.type !== 'driver') {
        router.push('/dashboard/customer');
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

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8080');
      socket.addEventListener('open', () => {
        console.log('we are connected');
      });
      return socket;
    };

    const socket = connectWebSocket();
    console.log(socket);
  }, []);

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
      <div className={styles.container__body}>
        <div className={styles.container__left}>
          <div className={styles.container__bookings}>
            <div className={styles.container__card_top}>Current Booking</div>
            <div className={styles.container__card_body}>
              <div className={styles.container__card_body_left}>
                <div className={styles.container__lat}>
                  <span>Latitude:</span> 123123234142
                </div>
                <div className={styles.container__long}>
                  <span>Longitude:</span> 12132312412
                </div>
                <div className={styles.container__fare}>
                  <span>Trip Fare:</span> Rs 303
                </div>
              </div>
              <div className={styles.container__card_body_right}>
                <div className={styles.container__accept}>Accept</div>
                <div className={styles.container__reject}>Reject</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container__right}>
          <div className={styles.container__toggle}>
            <label className={styles.switch}>
              <input type='checkbox' />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          <div className={styles.container__details}>
            <div className={styles.container__license}>
              <span>License Number:</span> 123123234142
            </div>
            <div className={styles.container__car_num}>
              <span>Car Number:</span> 12132312412
            </div>
            <div className={styles.container__email}>
              <span>Email:</span> test@email.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
