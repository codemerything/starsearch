export const getActorMovies = async (actorID, actor) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`,
    },
  };

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
