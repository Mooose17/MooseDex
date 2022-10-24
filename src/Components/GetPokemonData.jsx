import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; 
import db from '../firebase'
import PokemonContext from '../Contexts/PokemonContext'

const GetPokemonData = () =>{
    const [pokemon, setPokemon] = useState([])

    useEffect(()=>{
    async function fetchData() {
        const pokemonRes = []
        const pokemonDataSnapshot = await getDocs(collection(db,"pokemon-kanto-gen-1"));
        pokemonDataSnapshot.forEach((doc)=> {
          pokemonRes.push((doc.data()))
        })
        setPokemon(pokemonRes)
      }
      fetchData();
    },[])

    return (
        <PokemonContext.Provider value={{pokemon,setPokemon}}>
        </PokemonContext.Provider>
    )
}

export default GetPokemonData