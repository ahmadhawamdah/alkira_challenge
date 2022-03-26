/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import {useState} from "react";
import React from 'react';
import SharedContext from '../pages/SharedContext';
import { SearchIcon} from "@heroicons/react/solid";

export default function Header() {
    const {searchInp, setSearchInp} = React.useContext(SharedContext);
    return (
     <div>       
        <h1 style= {{color: "#074684"}} 
            data-aos="fade-right" className = "text-5xl mt-4">NBA TEAMS</h1>
            
        <div 
        style = {{width: "480px"}}
        className= 
        "flex items-center mb-5 mt-4 rounded-md border-blue-600 border-2 py-2 shadow-sm "
        > 
        
            <SearchIcon className="md:inline-flex h-8 
            p-2 cursor-pointer md:mx-2" />
            <input 
                className = "flex-grow pl-5 bg-transparent outline-none text-gray-600 text-sm placeholder-gray-400"
                value = {searchInp}
                onChange = {(e) => setSearchInp(e.target.value)}
                type="text" placeholder="Search by Name, City, Abbreviation, Conference, or Division"/>


        </div>
    </div>
    )
}
// npm i @heroicons/react
