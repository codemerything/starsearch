import Nav from "@/components/Nav";
import Info from "@/components/Info";
import Input from "@/components/Input";
import { useState } from "react";
import Results from "@/components/Results";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [movies, setMovies] = useState([]);

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
    <main className='bg-[url("https://ik.imagekit.io/mmnldm/bg.jpg?updatedAt=1699231064024")] bg-cover lg:bg-no-repeat lg:bg-top bg-fixed'>
      <div className="flex flex-col min-h-screen bg-black bg-opacity-80">
        <Nav />

        <AnimatePresence>
          {movies.length === 0 && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
            >
              <Info />
            </motion.div>
          )}
        </AnimatePresence>
        <Input parentFunction={addToResults} />
        {results}
      </div>
    </main>
  );
}
