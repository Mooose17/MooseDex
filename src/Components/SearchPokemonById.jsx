import { useState } from "react";
import db from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SearchPokemonById = () => {
  const [userInput, setUserInput] = useState("");
  const pokemonRef = collection(db, "pokemon-kanto-gen-1");
  const [dataFromQuery, setDataFromQuery] = useState([]);

  const fetchQueryData = async () => {
    const idQuery = query(pokemonRef, where("id", "==", parseInt(userInput)));
    const querySnapshot = await getDocs(idQuery);
    querySnapshot.forEach((doc) => {
      setDataFromQuery(doc.data());
      console.log(dataFromQuery);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchQueryData();
  };

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
          {dataFromQuery.name}
          {dataFromQuery.type}
        </p>
      </div>
    </>
  );
};

export default SearchPokemonById;
