import {type LoaderFunctionArgs, NavLink} from "react-router";
import { useLoaderData } from "react-router-dom";

export async function loader() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await res.json();

    return data.results;
}


export default function PokemonList() {
    const pokemons = useLoaderData() as { name: string; url: string }[];

    return (
        <div>
            <h1>Liste des Pokémon</h1>
            <ul>
                {pokemons.map((p) => (
                    <>
                    <li key={p.name}><NavLink to={`/pokemon/${p.name}`}>{p.name}</NavLink></li>
                    </>
                ))}
            </ul>
        </div>
    );
}
