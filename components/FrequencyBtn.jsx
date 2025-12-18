import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Clock1, Home } from 'lucide-react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const FrequencyBtn = () => {
    return (
        <div className='w-[200px] h-8 '>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full h-full bg-cardbackground text-primary ">
                        <Clock1 />Frequency
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="right" className="h-fit w-[200px] p-2 flex flex-col gap-3 justify-center items-center">
                    <div className='flex w-full gap-2 flex-col'>
                        <Label className="w-[110px]">
                            Set Frequency
                        </Label>
                        <Select >
                            <SelectTrigger className="w-full text-text text-xs bg-transparent" >

                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1min">
                                    1 Min
                                </SelectItem>
                                <SelectItem value="3min">
                                    3 Min
                                </SelectItem>
                                <SelectItem value="5min">
                                    5 Min
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="w-full h-full bg-primary text-cardbackground  ">
                            Save
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>


        </div>
    )
}

export default FrequencyBtn