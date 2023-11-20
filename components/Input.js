import React, { useEffect, useRef, useState } from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
import {
  getActorID,
  getActorMovies,
  filterMovies,
  getTrailer,
} from "./src/Utils";

export default function Input(props) {
  const [firstActor, setFirstActor] = useState("");
  const [secondActor, setSecondActor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const removeClass = (first) => {
    document.getElementById(first).classList.remove("hidden");

    setTimeout(() => {
      document.getElementById(first).classList.add("hidden");
    }, 2000);
    setIsLoading(false);
  };

  // FUNCTIONS TO UPDATE NAMES TO EACH STATE
  const handleFirstInput = (event) => {
    setFirstActor(event.target.value);
  };
  const handleSecondInput = (event) => {
    setSecondActor(event.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    if (firstActor && secondActor) {
      setIsLoading(true);
      let firstId = await getActorID(firstActor);
      let secondId = await getActorID(secondActor);

      if (firstId && secondId) {
        const firstMovies = await getActorMovies(firstId.id, firstId.name);
        const secondMovies = await getActorMovies(secondId.id, secondId.name);

        const filteredMovies = filterMovies(firstMovies, secondMovies);

        for (let index = 0; index < filteredMovies.length; index++) {
          let trailerLink = await getTrailer(filteredMovies[index].id);
          filteredMovies[index].trailer = trailerLink;
        }
        props.parentFunction(filteredMovies);
        setIsLoading(false);

        console.log(filteredMovies);
      }
    }
  };

  return (
    <section>
      <form className=" flex flex-row justify-center space-x-2 mx-auto lg:mt-5 mt-2 relative">
        <label className=" lg:space-x-14 space-x-4 justify-center items-center font-space-grotesk">
          <input
            type="text"
            onChange={handleFirstInput}
            placeholder="E.g Anne Hattaway"
            className="bg-star-gray lg:pr-4 lg:pl-6 lg:py-3 w-[145px] h-15 px-3 py-1 lg:w-auto lg:h-auto rounded-md text-black lg:text-xl placeholder:text-gray-400 placeholder:font-space-grotesk placeholder:text-[13px] lg:placeholder:text-xl focus:outline-none focus:ring-[#6d3daf] focus:ring-2"
          />
        </label>
        <label className="lg:space-x-14 space-x-4 justify-center items-center font-space-grotesk">
          <input
            type="text"
            onChange={handleSecondInput}
            placeholder="E.g Meryl Streep"
            className="bg-star-gray lg:pr-4 lg:pl-6 lg:py-3 w-[145px] h-15 px-3 py-1 lg:w-auto lg:h-auto rounded-md text-black lg:text-xl placeholder:text-gray-400 placeholder:font-space-grotesk placeholder:text-[13px] lg:placeholder:text-xl focus:outline-none focus:ring-[#6d3daf] focus:ring-2"
          />
        </label>
      </form>
      <button
        type="submit"
        onClick={handleButtonClick}
        className="flex bg-gradient-to-b from-[#ADB4FF] via-[#D1B0FF] to-[#6d3daf] mx-auto mt-6 lg:pl-5 lg:pr-3 lg:py-1 px-3 rounded-full font-grotesque-bold font-bold text-[20px] text-black"
      >
        {isLoading ? "Loading..." : "Search"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="lg:w-6 lg:h-6 w-5 h-5 lg:ml-3 mt-1 ml-2 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </section>
  );
}
