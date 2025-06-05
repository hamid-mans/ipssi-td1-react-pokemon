import {type LoaderFunctionArgs, NavLink} from "react-router";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
    const { pokemonName } = params;
    if (!pokemonName) throw new Response("Not Found", { status: 404 });

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!res.ok) throw new Response("Not Found", { status: 404 });

    const data = await res.json();
    return data;
}

export default function PokemonDetail() {
    const pokemon = useLoaderData();

    return (
        <div>
            <NavLink to="/pokemon">Retour</NavLink>
            <h1>Pokémon : {pokemon.name}</h1>
            <img
                src={pokemon.sprites?.front_default}
                alt={pokemon.name}
                width={150}
                height={150}
            />
            <p><strong>Taille :</strong> {pokemon.height}</p>
            <p><strong>Poids :</strong> {pokemon.weight}</p>
            <p><strong>Types :</strong> {pokemon.types.map((t: any) => t.type.name).join(", ")}</p>

            <h2>Informations supplémentaires</h2>
            <ul>
                {pokemon.stats.map((stat: any) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ErrorBoundary() {
    return (
        <div>
            <p>Le Pokémon n'existe pas.</p>
            <NavLink to="/pokemon">Retour à la liste des pokémons</NavLink>
        </div>
    );
}