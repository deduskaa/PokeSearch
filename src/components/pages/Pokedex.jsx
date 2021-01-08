import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { theme, typeColors } from '../../theme';
import { getGenI } from '../../fetchPokemon';
import styled from 'styled-components';
import { ReactComponent as Pokeball } from '../../pokeball.svg';
import { LoadingIndicator } from '../LoadingIndicator';

const generations = [{ text: 'Bulbasaur' }];

export const Pokedex = () => {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const pokemon = await getGenI();
      console.log('getPokemon -> pokemon', pokemon);
      setPokemon(pokemon);
    }

    if (!pokemon.length) {
      getPokemon();
    }
  }, [pokemon]);

  return (
    <Pokemon>
      {loading && <LoadingIndicator />}
      {pokemon.map(({ pokemon_species, entry_number }) => (
        <li key={pokemon_species.name}>
          <Button type="poison" to={`/pokemon/${entry_number}/${pokemon_species.name}`}>
            {pokemon_species.name}
            <Pokeball height={120} width={120} />
          </Button>
        </li>
      ))}
    </Pokemon>
  );
};

const Pokemon = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const Button = styled(Link)`
  ${theme.textTypes.bold};
  font-size: 18px;
  align-items: center;
  background-color: ${({ type }) => typeColors[type]};
  border-radius: 16px;
  box-shadow: 0 5px 20px #ddd;
  color: #fff;
  display: flex;
  height: 64px;
  justify-content: center;
  margin: 8px;
  overflow: hidden;
  padding: 16px;
  position: relative;
  text-decoration: none;
  text-align: center;

  path {
    opacity: 0.2;
    fill: #ffffff;
    fill-opacity: 1;
    stroke: none;
    /* animation: spin 1s infinite; */
    transform-origin: center center;
  }

  svg {
    position: absolute;
    right: -40px;
  }
`;
