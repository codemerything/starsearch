const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`,
  },
};

export const getActorID = async (actorName) => {
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

export const getActorMovies = async (actorID, actor) => {
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
    console.log(data.cast);
    return data.cast;
  } catch (error) {
    console.log(error);
  }
};

export const filterMovies = (firstMovie, secondMovie) => {
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
    console.log(value);
    if (
      big.has(key) &&
      !value.genre_ids.includes(10763) &&
      !value.genre_ids.includes(10764) &&
      !value.genre_ids.includes(10767) &&
      !value.genre_ids.includes(10751) &&
      !value.genre_ids.includes(99) &&
      !value.genre_ids.includes(35) &&
      !value.genre_ids.includes(10762) &&
      !value.genre_ids.includes(10751) &&
      !value.original_title.includes("The Oscars")
    ) {
      value.secondActorName = big.get(key).actorName;
      value.secondCharacterName = big.get(key).character;
      results.push(value);
    }
  }

  results = results.filter(function (element) {
    return element !== undefined;
  });
  console.log(results);

  return results;
};

export const getTrailer = async (movieId) => {
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
