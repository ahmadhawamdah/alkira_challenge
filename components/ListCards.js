/* eslint-disable jsx-a11y/alt-text */


import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import SharedContext from '../pages/SharedContext';

export default function ListCards({id, abbreviation, city, conference, description, division, full_name, name}) {
    const {setID, setClicked, setPanel} = React.useContext(SharedContext);

    return (
        <div>
            <div 
            style ={{backgroundColor: "#F8FBFD"}}
                className = "relative grid grid-cols-5 w-200 pl-7 p-3.5 gap-4 content-between cursor-pointer hover:scale-105 transform transition duration-300 east-out text-l font-medium"
                id = {id}
                onClick = {() => {
                    setID(id);
                    setClicked(true);
                    setPanel(true);
                }}
                >
                    <p> {name}</p>
                    <p> {city} </p>
                    <p> {abbreviation} </p>
                    <p> {conference} </p>
                    <p> {division} </p>
            </div>    

            </div>
    )
}
// npm i @heroicons/react
