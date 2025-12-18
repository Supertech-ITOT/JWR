"use client";

import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar1, Funnel, Home } from 'lucide-react';
import { Button } from './ui/button';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFilter } from '@/context/FilterContext';
import { tableData } from '@/constant/model';
import { useRouter } from 'next/navigation';

const daylist = ["Yesterday", "Last3Days", "Last5Days", "Last7Days"]

const Filter = ({ pageName, isRoom = true, isDay = true, isDuration = true, day = daylist }) => {
    const now = dayjs();
    const { roomCategory, selectedRoom, setSelectedRoom } = useFilter();
    const [fromDate, setFromDate] = useState(now);
    const [toDate, setToDate] = useState(now);
    const [selectedRange, setSelectedRange] = useState("yesterday");
    const router = useRouter();
    return (
        <div className='w-[200px] h-8 '>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-full bg-cardbackground text-primary ">
                        <Funnel />Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="h-fit w-[280px] p-2 flex flex-col gap-3 justify-center items-center">
                    {isRoom && <div className='flex w-full gap-2 items-center'>
                        <Home className='size-8 text-primary' />
                        <Label className="w-[110px]">
                            Room
                        </Label>
                        <Select value={selectedRoom}
                            onValueChange={(id) => {
                                setSelectedRoom(id);
                                router.push(`/${pageName}/${id}`)
                            }}>
                            <SelectTrigger className="w-full text-text text-xs bg-transparent" >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {tableData
                                    .filter(item => item.category === roomCategory)
                                    .map(item => (
                                        <SelectItem key={item.RoomName} value={item.RoomName}>
                                            {item.RoomName}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>}
                    {isDay && <div className='flex w-full gap-2 items-center'>
                        <Calendar1 className='size-8 text-primary' />
                        <Label className="w-[110px]">
                            Day
                        </Label>
                        <Select >
                            <SelectTrigger className="w-full text-text text-xs bg-transparent" >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {day.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>}
                    {isDuration && (<><div className='flex flex-col w-full gap-2 '>
                        <Label>
                            From DateTime
                        </Label>
                        <DateTimePicker
                            value={fromDate}
                            maxDateTime={now}
                            maxDate={now}
                            onChange={(d) => setFromDate(d)}
                            slotProps={{
                                openPickerIcon: {
                                    className: "text-primary",
                                },
                                textField: {
                                    InputProps: {
                                        style: { borderRadius: 6, fontSize: 12, color: "grey" },
                                        className: "h-8 rounded-md border border-border text-textSecondary "
                                    }
                                }
                            }}
                        />
                    </div>
                        <div className='flex flex-col w-full gap-2 '>
                            <Label>
                                To DateTime
                            </Label>
                            <DateTimePicker
                                value={toDate}
                                maxDateTime={now}
                                maxDate={now}
                                onChange={(d) => setToDate(d)}
                                slotProps={{
                                    openPickerIcon: {
                                        className: "text-primary",
                                    },
                                    textField: {
                                        InputProps: {
                                            style: { borderRadius: 6, fontSize: 12, color: "grey" },
                                            className: "h-8 rounded-md border border-border text-textSecondary "
                                        }
                                    }
                                }}
                            />
                        </div>
                    </>)}
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Filter;