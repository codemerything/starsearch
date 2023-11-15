export const getTrailer = async (movieId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`,
    },
  };

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
