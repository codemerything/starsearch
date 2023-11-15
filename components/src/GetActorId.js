export const getActorID = async (actorName) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`,
    },
  };

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
