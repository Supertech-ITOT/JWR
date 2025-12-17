"use client"
import { room } from '@/constant/model';
import { useFilter } from '@/context/FilterContext';
import React from 'react'

const RoomTitle = ({ id }) => {
    const { roomCategory } = useFilter();
    return (

        <h1 className='font-bold sm:text-3xl text-2xl text-textsecondary tracking-[2px] uppercase mt-2 animate-in slide-in-from-top-100 duration-1200'>{room[roomCategory] ?? "Room"} : {id}</h1>

    )
}

export default RoomTitle