import React, { useEffect } from 'react';

function CreateBooking() {
  useEffect(() => {
    if (localStorage.getItem('namma_data') === null) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  return <div>CreateBooking</div>;
}

export default CreateBooking;
