import gsap from "gsap";
import React, { useContext, useRef, useState } from "react";
import { ButtonContext } from "./ButtonContext";

export default function Input(props) {
  // TDMB API Header
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`,
    },
  };

  const { setClicked } = useContext(ButtonContext);

  const inputRef = useRef();
  const onEnter = () => {
    if (isClicked) return;
    gsap.to(inputRef.current, { y: -140, duration: 2 });
    setIsClicked(true);
    setClicked(true);
  };

  // STATES
  const [firstActor, setFirstActor] = useState("");
  const [secondActor, setSecondActor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // FUNCTIONS TO UPDATE NAMES TO EACH STATE
  const handleFirstInput = (event) => {
    setFirstActor(event.target.value);
  };
  const handleSecondInput = (event) => {
    setSecondActor(event.target.value);
  };

  // FETCH ACTORID
  const getActorID = async (actorName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${actorName}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error(error);
    }
  };

  const getActorMovies = async (actorID, actor) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorID}/combined_credits?language=en-US`,
        options
      );
      const data = await response.json();
      for (let i = 0; i < data.cast.length; i++) {
        data.cast[i].actorName = actor;
        if (data.cast[i].media_type === "tv") {
          data.cast[i].original_title = data.cast[i].original_name;
        }
      }
      return data.cast;
      console.log(data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const filterMovies = (firstMovie, secondMovie) => {
    const firstMovieMap = new Map();
    const secondMovieMap = new Map();

    for (let i = 0; i < firstMovie.length; i++) {
      firstMovieMap.set(firstMovie[i].id, firstMovie[i]);
    }
    for (let i = 0; i < secondMovie.length; i++) {
      secondMovieMap.set(secondMovie[i].id, secondMovie[i]);
    }

    let small;
    let big;

    if (firstMovieMap.size < secondMovieMap.size) {
      small = firstMovieMap;
      big = secondMovieMap;
    } else {
      small = secondMovieMap;
      big = firstMovieMap;
    }

    let results = [];

    for (let [key, value] of small) {
      if (
        big.has(key) &&
        !value.genre_ids.includes(10763) &&
        !value.genre_ids.includes(10763) &&
        !value.genre_ids.includes(10764) &&
        !value.genre_ids.includes(10767) &&
        !value.genre_ids.includes(10751) &&
        !value.genre_ids.includes(99)
      ) {
        value.secondActorName = big.get(key).actorName;
        value.secondCharacterName = big.get(key).character;
        results.push(value);
      }
    }

    results = results.filter(function (element) {
      return element !== undefined;
    });

    return results;
  };

  const getTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      let prop = "type";
      let value = "Trailer";

      let resultss = data.results.find((obj) => obj[prop] === value);
      return `https://www.youtube.com/watch?v=${resultss.key}`;
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let firstId = await getActorID(firstActor);
    let secondId = await getActorID(secondActor);

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
  };

  return (
    <form
      onSubmit={handleButtonClick}
      className=" flex mx-auto flex-col lg:mt-5 mt-2"
      ref={inputRef}
    >
      <label className=" lg:space-x-14 space-x-4 justify-center font-space-grotesk">
        <input
          type="text"
          onChange={handleFirstInput}
          placeholder="E.g Anne Hattaway"
          className="bg-star-gray lg:pr-4 lg:pl-6 lg:py-3 w-[145px] h-15 px-3 py-1 lg:w-auto lg:h-auto rounded-md text-black lg:text-xl placeholder:text-gray-400 placeholder:font-space-grotesk placeholder:text-[13px] lg:placeholder:text-xl focus:outline-none focus:ring-[#6d3daf] focus:ring-2"
        />
        <input
          type="text"
          onChange={handleSecondInput}
          placeholder="E.g Meryl Streep"
          className="bg-star-gray lg:pr-4 lg:pl-6 lg:py-3 w-[145px] h-15 px-3 py-1 lg:w-auto lg:h-auto rounded-md text-black lg:text-xl placeholder:text-gray-400 placeholder:font-space-grotesk placeholder:text-[13px] lg:placeholder:text-xl focus:outline-none focus:ring-[#6d3daf] focus:ring-2"
        />
      </label>
      <button
        onClick={onEnter}
        type="submit"
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
    </form>
  );
}
