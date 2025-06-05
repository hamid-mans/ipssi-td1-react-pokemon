import { createContext, useState, useContext, useEffect, type ReactNode } from "react";

type PokemonListItem = {
    name: string;
    url: string;
};

type PokemonDetails = any;

interface PokemonContextType {
    pokemons: PokemonListItem[];
    selectedPokemon: PokemonDetails | null;
    fetchPokemons: () => Promise<void>;
    fetchPokemonDetails: (name: string) => Promise<void>;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

    const fetchPokemons = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            const data = await res.json();
            setPokemons(data.results);
        } catch (error) {
            console.error("Erreur lors de la récupération des Pokémons :", error);
        }
    };

    const fetchPokemonDetails = async (name: string) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await res.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails :", error);
        }
    };

    return (
        <PokemonContext.Provider
            value={{
        pokemons,
            selectedPokemon,
            fetchPokemons,
            fetchPokemonDetails,
    }}
>
    {children}
    </PokemonContext.Provider>
);
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error("usePokemon must be used within a PokemonProvider");
    }
    return context;
};
