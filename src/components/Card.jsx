import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import { typeColors } from '../theme';

export const Card = (props) => {
  const settingType = function (pokemonData) {
    let typeDiv;
    if (pokemonData) {
      const types = pokemonData.types;
      if (types.length > 1) {
        typeDiv = types.map((type, i) => {
          return (
            <div key={type} className={`${type} Card-type`}>
              {type}
            </div>
          );
        });
      } else {
        // Only one type
        const type = pokemonData.types[0];
        typeDiv = <div className={`${type} Card-type`}>{type}</div>;
      }
    }
    return typeDiv;
  };

  const addToList = () => {
    localStorage.setItem('pokemon', JSON.stringify(props.pokemonInfo));
  };

  const pokemonData = props.pokemonInfo;
  const backBtn = (
    <button
      onClick={() => {
        props.callbackFromParent(pokemonData.pokemon_id - 1);
      }}
      className="Card-btnNav Card-btnBack"
    >
      <FontAwesome name="caret-left" size="3x" />
    </button>
  );

  return (
    <Container>
      <CardHeader type={pokemonData.types[0]}>
        <p className="Card-id">#{pokemonData.pokemon_id}</p>
        <h2 className="Card-title">{pokemonData.pokemon} </h2>
        <p className="Card-genus"> - {pokemonData.genus} Pokemon</p>
      </CardHeader>
      <ImgWrapper>
        <img src={pokemonData.picture} alt={pokemonData.pokemon} />
      </ImgWrapper>
      <Stats>
        {pokemonData.stats.map((data, i) => (
          <li key={`${data.stat.name}-${i}`}>
            {data.stat.name}: <span>{data.base_stat}</span>
          </li>
        ))}
      </Stats>
      {/* <div className="Card--type-container">{settingType(pokemonData)}</div>
        <div className="Card-additional-info-container"> 
          <li>Height: {pokemonData.height}</li>
          <li>Weight: {pokemonData.weight}</li>
          <li>Base Happiness: {pokemonData.height}</li>
          <li>Capture Rate: {pokemonData.weight}</li>
        </div>*/}
      <DescriptionContainer>
        <h3>Pokedex entry</h3>
        <Description>{pokemonData.description}</Description>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.section`
  background-color: #f1f1f1;
  border-radius: 4px;
  display: grid;
  grid-template-areas:
    'header header'
    'image stats'
    'description description';
  margin: auto;
  max-width: 400px;

  color: #222224;
  margin: 0 auto;
  min-height: 30rem;
`;

const ImgWrapper = styled.div`
  grid-area: image;

  img {
    width: 100%;
  }
`;

const CardHeader = styled.header`
  align-items: center;
  background-color: ${({ type }) => typeColors[type]};
  color: #fff;
  display: flex;
  grid-area: header;
  height: 56px;
  margin-bottom: 16px;
  padding: 8px 16px;
  position: relative;
  width: 100%;
`;

const DescriptionContainer = styled.div`
  margin-top: 1rem;
  padding: 2rem 2rem 1rem;
  width: 100%;
  grid-area: description;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 0;
`;

const Stats = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;
