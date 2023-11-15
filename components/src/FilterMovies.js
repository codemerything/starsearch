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
