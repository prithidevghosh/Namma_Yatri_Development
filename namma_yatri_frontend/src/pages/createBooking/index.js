import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/styles/createBooking.module.scss';
import Image from 'next/image';
import nammaYatriLogo from '../../../public/assets/brand.svg';
import logoutIMG from '../../../public/assets/logoutIMG.png';
import locationIMG from '../../../public/assets/location.png';
import Link from 'next/link';
import { logout } from '@/stores/cabBook';

function createBooking() {
  const [name, setName] = useState('');
  const { isLoggedIn } = useSelector((state) => state.cabReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  function getCurrentLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          setPresentAddress({latitude, longitude});
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  console.log(isLoggedIn);
  useEffect(() => {
    if ( localStorage.getItem('namma_data') === null) {
      router.push('/');
    }
  }, []);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    const nammaData = localStorage.getItem('namma_data');
    if (typeof window !== 'undefined' && nammaData) {
      const customerData = JSON.parse(nammaData);
      setName(customerData.name);
    }
  }, []);
  const [destination, setDestination] = useState({
    latitude: '',
    longitude: '',
  });
  const [presentAddress, setPresentAddress] = useState({
    latitude: '',
    longitude: '',
  });

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handlePresentAddressChange = (e) => {
    setPresentAddress(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__head}>
        <div className={styles.container__left}>
          <Image
            className={styles.container__logo}
            src={nammaYatriLogo}
            alt='nammaYatriLogo'
            width={300}
            height={300}
          />
          <Link className={styles.container__item} href={'/dashboard/customer'}>
            Dashboard
          </Link>
        </div>
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
        <form className={styles.form}>
          <div className={styles.form__group}>
            <label htmlFor='destination' className={styles.form__label}>
              Destination:
            </label>
            <label htmlFor='destination-lat' className={styles.form__label_inp}>
              Destination Latitude:
            </label>
            <input
              type='text'
              id='destination-lat'
              className={styles.form__input}
              value={destination.latitude}
              onChange={handleDestinationChange}
            />
            <label
              htmlFor='destination-long'
              className={styles.form__label_inp}
            >
              Destination Longitude:
            </label>
            <input
              type='text'
              id='destination-long'
              className={styles.form__input}
              value={destination.longitude}
              onChange={handleDestinationChange}
            />
          </div>

          <div className={styles.form__group}>
            <label htmlFor='present-address-lat' className={styles.form__label}>
              Present Address:
            </label>

            <label
              htmlFor='present-address-lat'
              className={styles.form__label_inp}
            >
              Present Address Latitude:
              <Image title='Get Present Address' height={15} width={15} style={{cursor:'pointer'}} src={locationIMG} alt='location'  onClick={(e) => getCurrentLocation(e)}/>
            </label>
            <input
              type='text'
              id='present-address-lat'
              className={styles.form__input}
              value={presentAddress.latitude}
              onChange={handlePresentAddressChange}
            />
            <label
              htmlFor='present-address-long'
              className={styles.form__label_inp}
            >
              Present Address Longitude:
            </label>
            <input
              type='text'
              id='present-address-long'
              className={styles.form__input}
              value={presentAddress.longitude}
              onChange={handlePresentAddressChange}
            />
          </div>

          <button type='submit' className={styles.form__button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default createBooking;
