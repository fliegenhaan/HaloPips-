"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const DashboardProfile = ({ 
  fullName, 
  nickName,
  nim,
  image }:{
  fullName: string,
  nickName: string,
  nim: string,
  image: string,
  }) => {
  return (
    <div className='flex flex-row rounded-xl bg-pips-400'>
      <Avatar className='w-36 h-36 m-6'>
        <AvatarImage src={image}/>
      </Avatar>
      <div className=' flex flex-col m-4'>
        <h2 className='font-bold text-xl text-pips-100'>Nama Lengkap</h2>
        <p className='text-l text-pips-100'>{fullName}</p>
        <h2 className='font-bold text-xl text-pips-100'>Nama Panggilan</h2>
        <p className='text-l text-pips-100'>{nickName}</p>
        <h2 className='font-bold text-xl text-pips-100'>NIM</h2>
        <p className='text-l text-pips-100'>{nim}</p>
      </div>
    </div>
  )
}

export default DashboardProfile
