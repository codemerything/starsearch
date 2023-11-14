import React, { useState } from "react";

// set state to false
//check if the description is > 100
// add read more toggle button
// onclick of read more show full description
// else slice it from 0, 100 and show "read less"

export default function Results({
  title,
  poster,
  description,
  actor1,
  actor1Character,
  actor2,
  actor2Character,
  trailer,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col lg:flex-row h-fit justify-center my-10 mb-5 space-x-4 mx-auto leading-relaxed">
      <div>
        {poster === null ? (
          "No poster"
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={title}
            className="lg:w-[35vw] lg:h-[35vw] max-w-[350px] max-h-[350px] rounded-lg mx-auto"
          />
        )}
      </div>

      <div className=" lg:w-[30vw] w-fit h-fit text-white text-center">
        <h1 className=" font-grotesque-bold lg:text-3xl font-bold">
          {" "}
          {title}{" "}
        </h1>
        <div className="font-grotesque-regular lg:text-lg">
          {isExpanded
            ? description
            : description.length > 130
            ? `${description.slice(0, 130)}...`
            : description}
          {description.length > 130 && (
            <button
              className="text-green-500 cursor-pointer"
              onClick={toggleText}
            >
              {isExpanded ? " Show less" : " Show more"}
            </button>
          )}
        </div>

        <div className=" font-grotesque-regular lg:text-lg font-bold">
          <p>
            {actor1} : {actor1Character}
          </p>
          <p>
            {actor2} : {actor2Character}
          </p>
        </div>
        <a href={trailer} className="font-grotesque-regular font-bold">
          Watch Trailer
        </a>
      </div>
    </section>
  );
}
