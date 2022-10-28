import { useState } from "react";
import db from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const SearchPokemonById = () => {
  const [userInput, setUserInput] = useState("");
  const pokemonRef = collection(db, "pokemon-kanto-gen-1");
  const [pokemon, setPokemon] = useState([]);

  const fetchQueryData = async () => {
    const pokemonRes = [];

    if (!userInput) {
      const pokemonDataSnapshot = await getDocs(
        collection(db, "pokemon-kanto-gen-1")
      );
      pokemonDataSnapshot.forEach((doc) => {
        pokemonRes.push(doc.data());
      });
    } else {
      const idQuery = query(pokemonRef, where("id", "==", parseInt(userInput)));
      const querySnapshot = await getDocs(idQuery);
      querySnapshot.forEach((doc) => {
        pokemonRes.push(doc.data());
      });
    }

    setPokemon(pokemonRes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchQueryData();
  };

  useEffect(() => {
    fetchQueryData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Poké ID:
            <input
              type="text"
              name="name"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
        <h2>Results:</h2>
        <p>
          {pokemon.map((entry) => (
            <div className="Pokemon--div__parent" key={entry.id}>
              {entry.name}
              <img src={entry.image_url} alt={entry.name}></img>
            </div>
          ))}
        </p>
      </div>
    </>
  );
};

export default SearchPokemonById;
