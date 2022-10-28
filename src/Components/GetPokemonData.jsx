import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import SearchPokemonById from "./SearchPokemonById";

const GetPokemonData = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pokemonRes = [];
      const pokemonDataSnapshot = await getDocs(
        collection(db, "pokemon-kanto-gen-1")
      );
      pokemonDataSnapshot.forEach((doc) => {
        pokemonRes.push(doc.data());
      });
      setPokemon(pokemonRes);
    }
    fetchData();
  }, []);

  return <SearchPokemonById />;
};

export default GetPokemonData;
