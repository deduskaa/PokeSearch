import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { Card } from '../Card';
import { theme } from '../../theme';
import { LoadingIndicator } from '../LoadingIndicator';
import { ReactComponent as Pokeball } from '../../pokeball.svg';

export const FrontPage = props => {
  const [gotFormData, setGotFormData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState({});

  const myCallback = dataFromChild => {
    searchPokemon(dataFromChild);
  };

  const getPokemonData = data => {
    const pokemon = {
      pokemon_id: data.id,
      pokemon: data.name,
      types: data.types.map(d => d.type.name).reverse(),
      picture: data['sprites']['front_default'],
      species_url: data.species.url,
      stats: data.stats,
      height: data.height,
      weight: data.weight,
      happiness: data.base_happiness
    };

    const request = new Request(pokemon.species_url);
    fetch(request).then(response => {
      // Check if there is existing data in cache
      response.json().then(data => {
        console.log(data);
        setAdditionalPokemonData(data, pokemon);
      });
    });
  };

  const setAdditionalPokemonData = (data, pokemon) => {
    pokemon.genus = data.genera[2]['genus'];
    pokemon.capture_rate = data.capture_rate;

    //Loop through descriptions and search for the first english one
    for (let i = 0; i < data['flavor_text_entries'].length; i++) {
      if (data['flavor_text_entries'][i]['language']['name'] === 'en') {
        pokemon.description = data['flavor_text_entries'][i]['flavor_text'];
        setLoading(false);
        setGotFormData(true);
        setPokemonData(pokemon);
        break;
      }
    }
  };

  const searchPokemon = pokemonID => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
    const request = new Request(url);
    setLoading(true);

    fetch(request).then(response => response.json().then(data => getPokemonData(data)));
  };

  const navButtons = [
    { value: 'Pokedex', color: '#4dc2a5', path: '/pokedex' },
    { value: 'Abilities', color: '#58aaf2', path: '/' },
    { value: 'Locations', color: '#7a528a', path: '/' },
    { value: 'Type Charts', color: '#b3736b', path: '/' },
    { value: 'Items', color: '#ffcf4b', path: '/' },
    { value: 'Moves', color: '#f7776a', path: '/' }
  ];

  return (
    <Container>
      <Pokeball height={400} width={400} />
      <Title>What Pokemon are you looking for?</Title>
      <SearchBar callbackFromParent={myCallback} />
      {/* <TypeFilters callbackFromParent={myCallback} /> */}
      {gotFormData && !loading && (
        <Card pokemonInfo={pokemonData} callbackFromParent={myCallback} />
      )}
      {loading && <LoadingIndicator />}
      <Navigation>
        {navButtons.map(({ color, path, value }) => (
          <Button to={path} color={color}>
            {value} <Pokeball height={120} width={120} />
          </Button>
        ))}
      </Navigation>
    </Container>
  );
};

const Navigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
`;

const Button = styled(Link)`
  ${theme.textTypes.bold};
  font-size: 18px;
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 16px;
  border: none;
  box-shadow: 0 5px 20px -10px ${({ color }) => color};
  color: #ffffff;
  display: flex;
  height: 64px;
  margin: 8px;
  overflow: hidden;
  padding: 16px;
  position: relative;
  text-decoration: none;

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

const Container = styled.main`
  background-color: #fff;
  box-shadow: 0 1px 20px #ddd;
  padding: 200px 24px 56px;
  position: relative;
  border-radius: 0 0 24px 24px;
  overflow: hidden;

  > svg {
    position: absolute;
    top: -100px;
    right: -120px;
    > path {
      opacity: 0.4;
      fill: #dddddd;
      fill-opacity: 1;
      stroke: none;
      /* animation: spin 1s infinite; */
      transform-origin: center center;
    }
  }
`;

const Title = styled.h1`
  ${theme.textTypes.condensedBold};
  margin: 0 0 16px;
  position: relative;
`;
