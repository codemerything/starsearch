import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import yt from "../public/yt.svg";
import Image from "next/image";

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
  const [loading, setIsLoading] = useState(true);

  const loadingStatus = () => {
    setIsLoading(false);
  };
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col lg:flex-row h-fit justify-center my-10 mb-5 space-x-4 mx-auto leading-relaxed">
      {poster === null ? (
        <div className="bg-white px-2 flex items-center font-grotesque-bold">
          NO POSTER AVAILABLE
        </div>
      ) : (
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt={title}
          onLoad={loadingStatus}
          placeholderSrc={`https://image.tmdb.org/t/p/original/${poster}`}
          className="lg:w-[35vw] lg:h-[35vw] max-w-[350px] max-h-[350px] rounded-lg mx-auto"
          effect={loading ? "blur" : null}
        />
      )}

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
        <div className="flex justify-center space-x-2">
          {trailer === undefined ? null : (
            <>
              <Image src={yt} alt="Arrow-down" width={20} height={20} />
              <a
                href={trailer}
                className="font-grotesque-regular font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
