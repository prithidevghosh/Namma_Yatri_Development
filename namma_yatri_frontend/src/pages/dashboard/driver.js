import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function driver() {
  const router = useRouter();
  useEffect(() => {
    const nammaData = localStorage.getItem('namma_data');
    const customerData = JSON.parse(nammaData);
    if (customerData) {
      if (customerData.type !== 'driver') {
        router.push('/dashboard/customer');
      }
    } else {
      router.push('/');
    }
  }, []);

  return <div>driver</div>;
}

export default driver;
