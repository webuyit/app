'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import router from 'next/router';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SERVER_URL, SOCIAL_LINKS } from '@/lib/constants';
import { USER_PROFILE_PROPS } from '@/types/types';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Slide from './slide';

/**/

export default function Onboarding() {
  const { ready, authenticated, logout, user } = usePrivy();

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: USER_PROFILE_PROPS) => {
      const res = await axios.post(`${SERVER_URL}users/register`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Account created!');
      console.log('Created be account succfully');
    },
    onError: (err) => {
      toast.error('Failed to Register profile');
      console.log('Creating acc failed', err);
    },
  });

  //  Refirect user to Home page
  /* useEffect(() => {
    if (authenticated) {
      router.replace('/home');
    }
  }, [authenticated]);*/

  const { login } = useLogin({
    onComplete: async ({
      user,
      //isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      console.log('From in-complete');
      //router.push('/home');
      // if(loginMethod === "")

      // Create AN ACCOUNT
      /* if (loginMethod === 'email') {
        const metadata: USER_PROFILE_PROPS = {
          email: user.email?.address || '',
          publicKey: user.wallet?.address || '',
          privyId: user.id,
          walletSource: 'PRIVY',
          authMethod: 'EMAIL',
        };
        mutation.mutate(metadata);
      } else if (loginMethod === 'google') {
        const metadata: USER_PROFILE_PROPS = {
          email: user.email?.address || '',
          publicKey: user.wallet?.address || '',
          privyId: user.id,
          walletSource: 'PRIVY',
          authMethod: 'GOOGLE',
          userName: user.google?.name || '',
        };
        mutation.mutate(metadata);
      } else if (loginMethod === 'twitter') {
        const metadata: USER_PROFILE_PROPS = {
          email: user.email?.address || '',
          publicKey: user.wallet?.address || '',
          privyId: user.id,
          walletSource: 'PRIVY',
          authMethod: 'X',
          userName: user.twitter?.username || '',
          fullName: user.twitter?.name || '',
          profilePicture: user.twitter?.profilePictureUrl || '',
        };
        mutation.mutate(metadata);
      }*/

      // 3. Continue to app
      // router.push('/home');

      const email = user.email?.address || '';
      const publicKey = user.wallet?.address || '';
      const privyId = user.id;
      const isNewUser = true;
      if (isNewUser) {
        console.log("I'm at wallet create account");
        const metadata: USER_PROFILE_PROPS = {
          email,
          publicKey,
          privyId,
          walletSource: 'PRIVY',
          authMethod: loginMethod?.toUpperCase() || '', // 'EMAIL', 'GOOGLE', etc.
        };

        if (loginMethod === 'google') {
          metadata.fullName = user.google?.name || '';
        }

        if (loginMethod === 'twitter') {
          metadata.userName = user.twitter?.username || '';
          metadata.fullName = user.twitter?.name || '';
          metadata.profilePicture = user.twitter?.profilePictureUrl || '';
        }
        console.log("I'm Invoked down");
        mutation.mutateAsync(metadata);
      }

      // 3. Continue to app
      // router.push('/home');
    },
    onError: (error) => {
      console.log(`error creating acc`, error);
      toast.error('Failed to create Privy account');
    },
  });

  if (!ready) {
    return <div className="h-screen w-full">Loading...</div>;
  }

  /*

   privyId,
    clerkId,
    referredByCode,
    fullName,
    email,
    firstName,
    lastName,
    username,
    publicKey,
    walletSource,
    */
  return (
    <div className="flex h-screen w-full flex-col justify-between">
      {/* Slides wrapper */}
      <div className="h-[70vh]">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
            bulletClass: ' custom-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
        >
          <SwiperSlide>
            <Slide title="First slide" className="h-[70vh] bg-red-500" />
          </SwiperSlide>
          <SwiperSlide>
            <Slide title="Second slide" className="h-[70vh]" />
          </SwiperSlide>
          <SwiperSlide>
            <Slide title="Third slide" className="h-[70vh]" />
          </SwiperSlide>
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination mt-4 flex justify-center gap-1" />
      </div>

      {/* Fixed bottom section */}
      <div className="flex h-[30vh] flex-col items-center justify-end space-y-6 pb-6">
        <Button
          size={'lg'}
          className="w-11/12"
          disabled={!ready || authenticated}
          onClick={() => login()}
        >
          Get Started
        </Button>

        <div className="flex items-center gap-4">
          <div className="h-[1px] w-10 bg-border" />
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((item, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <div className="h-4 w-[1px] bg-border" />}
                <div>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="h-[1px] w-10 bg-border" />
        </div>

        <Button onClick={logout} disabled={!ready}>
          Logout
        </Button>
      </div>
    </div>
  );
}
