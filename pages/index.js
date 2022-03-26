import Head from 'next/head'
import React from 'react';
import { useState } from "react";
import SharedContext from './SharedContext';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../components/Header";
import ListCards from "../components/ListCards";
import Card from "../components/Card";

export default function Home({ nbaTeams, nbaGames }) {

  const [teams, setTeams] = React.useState(nbaTeams.data ? nbaTeams.data : "");
  const [games, setGames] = React.useState(nbaGames.data ? nbaGames.data : "");
  const [sortArrow, setSortArrow] = React.useState("↑");
  const [singleID, setID] = React.useState(0);
  const [clicked, setClicked] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [searchInp, setSearchInp] = useState("");
  const [prev, setPrev] = React.useState(0);
  const [next, setNext] = React.useState(7);
  const [pageNum, setPageNum] = React.useState(1);
  const [panel, setPanel] = React.useState(false);

  if (singleID) {
    var warning = document.getElementById(singleID);
    if (warning && clicked) {
      warning.style.backgroundColor = "#E0E0E0";
    } else if (warning && !clicked) {
      warning.style.backgroundColor = "#F8FBFD";
    }
  }

  function sortTeams() {
    if (sort) {
      const sorted = [...nbaTeams.data].sort((a, b) => {
        return a.city > b.city ? 1 : -1
      })
      setTeams(sorted);
      setSortArrow("↑");
    }
    if (!sort) {
      const sorted = [...nbaTeams.data].sort((a, b) => {
        return a.city < b.city ? 1 : -1
      })
      setTeams(sorted);
      setSortArrow("↓");
    }
  }

  const nextPage = () => {
    if (next > 30 || prev > 30) {
      setNext(30);
      setPrev(23);
    } else {
      setNext(next + 7);
      setPrev(prev + 7);
    }
  }

  const prevPage = () => {
    if (next < 0 || prev < 0) {
      setNext(7);
      setPrev(0);
    } else {
      setNext(next - 7);
      setPrev(prev - 7);
    }
  }


  return (

    <div>
      <Head>
        <title>Alkira Challenge</title>
        <meta name="description" content="Alkira Challenge done by Ahmad Hawamdah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-20">
        <SharedContext.Provider
          value={{ games, setGames, searchInp, setSearchInp, singleID, setID, setClicked, panel, setPanel, nbaGames }}>
          <Header />
          {singleID != 0 && clicked && <Card />}
          <div
            style={{ color: "white", backgroundColor: "#074684" }}
            className="grid grid-cols-5 w-200 pl-6 p-3.5 gap-4 content-between pt-4 color-white text-xl font-semibold">
            <p> Name </p>
            <p
              className="cursor-pointer"
              onClick={() => {
                sortTeams();
                setSort(!sort);
              }}
            > City {sortArrow} </p>
            <p> Abbreviation </p>
            <p> Conference </p>
            <p> Division </p>
          </div>
          {teams &&
            teams
              .slice(prev, next)
              .filter((team) => {
                if (searchInp === "") {
                  return (team);
                } else if
                  (team && team.name !== undefined &&
                  team.name.toLowerCase()
                    .includes(searchInp.toLowerCase())) {
                  return team;
                } else if
                  (team && team.city !== undefined && team.city.toLowerCase()
                    .includes(searchInp.toLowerCase())) {
                  return team;
                } else if (
                  team && team.abbreviation !== undefined && team.abbreviation.toLowerCase()
                    .includes(searchInp.toString().toLowerCase())) {
                  return team;
                } else if (
                  team && team.division !== undefined && team.division.toLowerCase()
                    .includes(searchInp.toString().toLowerCase())) {
                  return team;
                }
              },
              )
              .map(({ id, abbreviation, city, conference, description, division, full_name, name }) => (
                <div key={id} style={{ marginBottom: "5px" }}>
                  <ListCards
                    id={id}
                    abbreviation={abbreviation}
                    city={city}
                    conference={conference}
                    description={description}
                    division={division}
                    full_name={full_name}
                    name={name}
                  />
                </div>
              ))
          }
          <div className="float-right mr-5 grid grid-cols-4 gap-4 text-xl pl-4 pr-4 mt-7">
            <button
              className="rounded-md hover:scale-95"
              disabled={prev <= 0 ? true : false}
              style={{ color: "white", backgroundColor: "#074684" }}
              onClick={() => {
                prevPage();
                setPageNum(pageNum - 1);
              }}
            > &#60; </button>
            <div
              className="rounded-md text-white pl-4 pr-4 bg-[#074684]"
            > {pageNum}</div>
            <div
              className="rounded-md text-white pl-4 pr-4 bg-[#074684]"
            > 5 </div>
            <button

              disabled={next >= 30 ? true : false}
              className="pl-4 pr-4 rounded-md hover:scale-95"
              style={{ color: "white", backgroundColor: "#074684" }}
              onClick={() => {
                nextPage();
                setPageNum(pageNum + 1);
              }}
            > &#62; </button>
          </div>
        </SharedContext.Provider>
      </main>
    </div>
  )
}


export async function getStaticProps() {
  // call to the API, any request on the internet, we have to wait for utilizing Next.js
  const nbaTeams = await fetch("https://www.balldontlie.io/api/v1/teams").then(res => res.json());
  const nbaGames = await fetch("https://www.balldontlie.io/api/v1/games").then(res => res.json());

  return {
    props: {
      nbaTeams, nbaGames
    }
  }
}
