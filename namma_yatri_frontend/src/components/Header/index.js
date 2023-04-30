import React from 'react';
import brandIMG from '../../../public/assets/brand.gif';
import nammaYatriLogo from '../../../public/assets/nammaYatrilogo.svg';


import styles from './index.module.scss'; 
import Image from 'next/image';
import Link from 'next/link';

export default function Header({user}) {
  return (
    <nav className={styles.header}>
    <div className={styles.header__brand}>
    <Link href='/'>
    <Image src={nammaYatriLogo } width='50' height='50' alt='brand'/>
    </Link>
    </div>
      <ul className={styles.header__list}>
        <li className={styles.header__item}><Link href='/login/driver' className={styles.header__link} style={{textDecoration: user === 'driver' ? 'overline' : 'none'}}>Driver</Link></li>
        <li className={styles.header__item}><Link href='/login/customer' className={styles.header__link} style={{textDecoration: user === 'customer' ? 'overline' : "none"}}>Customer</Link></li>
      </ul>
    </nav>
  );
}
