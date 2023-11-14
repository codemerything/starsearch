import Nav from "@/components/Nav";
import Info from "@/components/Info";
import Input from "@/components/Input";
import { useState } from "react";
import Results from "@/components/Results";
import { ButtonContext } from "@/components/ButtonContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [clicked, setClicked] = useState(false);

  const addToResults = (filteredMovies) => {
    setMovies(filteredMovies);
  };

  const results = movies.map((movie) => {
    return (
      <Results
        title={movie.original_title}
        poster={movie.poster_path}
        description={movie.overview}
        actor1={movie.actorName}
        actor1Character={movie.character}
        actor2={movie.secondActorName}
        actor2Character={movie.secondCharacterName}
        key={movie.id}
        trailer={movie.trailer}
      />
    );
  });
  return (
    <main className='bg-[url("https://ik.imagekit.io/mmnldm/bg.jpg?updatedAt=1699231064024")] bg-cover bg-no-repeat bg-top bg-fixed'>
      <div className="flex flex-col min-h-screen bg-black bg-opacity-80">
        <Nav />
        <ButtonContext.Provider value={{ clicked, setClicked }}>
          <Info />
          <Input parentFunction={addToResults} />
          {results}
        </ButtonContext.Provider>
      </div>
    </main>
  );
}
