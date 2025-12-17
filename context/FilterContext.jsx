"use client";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [roomCategory, setRoomCategory] = useState("+veRoom");
    const [parameter, setParameter] = useState("Temperature");
    const [selectedRoom, setSelectedRoom] = useState("");
    return (
        <FilterContext.Provider value={{ roomCategory, setRoomCategory, parameter, setParameter, selectedRoom, setSelectedRoom }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);
