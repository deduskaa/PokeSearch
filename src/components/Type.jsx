import React from 'react';
import styled from 'styled-components';
import { typeColors } from '../theme';

const Type = props => {
  const searchPokemonByType = event => {
    const url = `https://pokeapi.co/api/v2/type/${event.target.id}/`;
    const request = new Request(url);
    fetch(request).then(response => {
      response.json().then(data => {
        const pokemon = data.pokemon.map(({ pokemon }) => pokemon.name);
        props.callbackFromParent(pokemon);
      });
    });
  };

  return (
    <TypeButton onClick={searchPokemonByType} type={props.type} id={props.type}>
      {props.type}
    </TypeButton>
  );
};

export default Type;

const TypeButton = styled.button`
  background-color: ${({ type }) => typeColors[type]};
  border-radius: 20px;
  border: 1px solid #333;
  color: #fff;
  font-size: 16px;
  font-variant: small-caps;
  font-weight: bold;
  margin: 8px;
  opacity: 0.85;
  outline: none;
  padding: 4px 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
