import React, { useState, useEffect } from 'react';
import AddEditAdress from '../../components/e-comms/shared/AdressComponent';
import ProfileComponent from '../../components/e-comms/shared/ProfileComponent';
import Cart from '../../components/e-comms/user/Cart';
import Orders from '../../components/e-comms/user/Orders';
import WishList from '../../components/e-comms/user/WishList';
import { useAuth } from '../../context/AuthContext';
import { iAdress, iUser, iUserUpdate } from '../../models/User';

export default function UserLandingPage() {
  const { currUser, updateUserProfile } = useAuth();

  const [showProfile, setshowProfile] = useState(false);
  const [showAdress, setshowAdress] = useState(false);
  const [showCart, setshowCart] = useState(true);
  const [showWishlist, setshowWishlist] = useState(false);
  const [showOrders, setshowOrders] = useState(false);

  useEffect(() => {}, [currUser]);

  return (
    <>
      <h1 className='text-center w-full'>User Dash</h1>
      {currUser ? (
        <>
          <div className='flex flex-col justify-center lg:justify-between content-start items-start'>
            {/* Display Buttons */}
            <div className='w-full flex flex-wrap flex-row justify-center content-start items-start mt-2'>
              <button className={`rounded border-2 border-primary-300 px-4 py-2 mx-4 mb-2`} onClick={() => setshowProfile(!showProfile)}>
                {showProfile ? 'Hide' : 'Show'} Profile
              </button>

              <button className={`rounded border-2 border-primary-300 px-4 py-2 mx-4 mb-2`} onClick={() => setshowAdress(!showAdress)}>
                {showAdress ? 'Hide' : 'Show'} Address
              </button>

              <button className={`rounded border-2 border-primary-300 px-4 py-2 mx-4 mb-2`} onClick={() => setshowCart(!showCart)}>
                {showCart ? 'Hide' : 'Show'} Cart
              </button>

              <button className={`rounded border-2 border-primary-300 px-4 py-2 mx-4 mb-2`} onClick={() => setshowWishlist(!showWishlist)}>
                {showWishlist ? 'Hide' : 'Show'} Wishlist
              </button>

              <button className={`rounded border-2 border-primary-300 px-4 py-2 mx-4 mb-2`} onClick={() => setshowOrders(!showOrders)}>
                {showOrders ? 'Hide' : 'Show'} Order History
              </button>
            </div>

            {/* Profile */}
            <div className='w-full flex flex-wrap flex-row justify-center content-start items-start mt-2'>
              {/* profile */}
              {showProfile && <ProfileComponent currentUser={currUser} callBack={(uid: string, user: iUser, newData: iUserUpdate) => updateUserProfile(uid, user, newData)} />}
              {/* Address */}
              {showAdress && <AddEditAdress defaultAddr={{} as iAdress} onSub={() => {}} />}
            </div>

            {/* carts */}
            <div className='w-full flex flex-col justify-center content-start items-start'>
              {showCart && <Cart />}
              {showWishlist && <WishList />}
              {showOrders && <Orders />}
            </div>
          </div>
        </>
      ) : (
        <div>Loading profile page</div>
      )}
    </>
  );
}
