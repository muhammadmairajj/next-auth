// "use client";
import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  } 
 const { name, email, image }: any = session?.user;

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Dashboard</h1>
      { session ? (
        <>
        <div className='flex h-screen flex-col items-center p-10'>
        <Image src={image} alt='avatarImage' width={100} height={80}
        style={{borderRadius:"50%"}}></Image>
        <h2>{name}</h2>
        <h2>{email}</h2>
        </div>
        </>
      ) : (
        null
      ) }
    </div>
  )
}

export default Dashboard;