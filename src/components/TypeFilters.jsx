import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Type from './Type.jsx';
import { theme } from '../theme';

export const TypeFilters = props => {
  const [types, setTypes] = useState(null);
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [hasPokemon, setHasPokemon] = useState(false);
  const [hideResults, setHideResults] = useState(false);

  useEffect(() => {
    getTypes();
  }, []);

  const pokemonFromFilterSearch = dataFromFilter => {
    setFilteredPokemon(dataFromFilter);
    setHasPokemon(true);
  };

  const getTypes = () => {
    const url = 'https://pokeapi.co/api/v2/type/';
    const request = new Request(url);
    fetch(request).then(response => {
      response.json().then(data => {
        const types = data.results
          .map(typeObj => typeObj.name)
          // splice last two empty types
          .splice(0, data.results.length - 2);
        setTypes(types);
      });
    });
  };

  const searchPokemon = event => {
    props.callbackFromParent(event.target.id);
    setHideResults(true);
  };

  const pokemonFromFilter =
    hasPokemon &&
    filteredPokemon.map(pokemon => (
      <Result onClick={searchPokemon} key={pokemon} id={pokemon}>
        {pokemon}
      </Result>
    ));

  return (
    <>
      <Filters>
        {types &&
          types.map(type => (
            <Type key={type} type={type} callbackFromParent={pokemonFromFilterSearch} />
          ))}
      </Filters>
      <Results>{!hideResults && pokemonFromFilter}</Results>
    </>
  );
};

const Filters = styled.div`
  margin: 24px auto;
  text-align: center;
  width: 80%;
`;

const Results = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 10rem;
`;

const Result = styled.button`
  background: #fff;
  border-top: 3px solid ${theme.colors.red};
  height: 3rem;
  margin: 1rem;
  outline: none;
  padding: 1rem;
  text-align: center;
  text-transform: capitalize;
  width: 10rem;
`;
