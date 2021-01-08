import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPokemon, getSpecies } from '../../../fetchPokemon';
import { typeColors, theme } from '../../../theme';
import { LoadingIndicator } from '../../LoadingIndicator';
import { ReactComponent as Pokeball } from '../../../pokeball.svg';
import { About } from './About';
import { Stats } from './Stats';

export const Pokemon = (props) => {
  const params = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  console.log('Pokemon -> pokemon', pokemon);
  const tabs = [
    { key: 'about', value: 'About' },
    { key: 'stats', value: 'Base Stats' },
    { key: 'evolution', value: 'Evolution' },
    { key: 'moves', value: 'Moves' },
  ];

  useEffect(() => {
    async function fetchPokemon(id) {
      const pokemon = await getPokemon(id);
      const additionalData = await getSpecies(id);
      setPokemon({ ...pokemon, ...additionalData });
    }

    if (params.name && !pokemon) {
      fetchPokemon(params.name);
    }
    console.log(pokemon);
  }, [pokemon, params.id]);

  return pokemon ? (
    <Container>
      <Background type={pokemon.types[0].type.name}>
        <Pokeball />
        <Actions>
          <FontAwesome name="fas fa-arrow-left" size="1x" />
          <FontAwesome name="far fa-heart" size="1x" />
        </Actions>
        <Name>
          {pokemon.name} <span># {pokemon.order}</span>
        </Name>
        <Types>
          {pokemon.types.map(({ type }) => (
            <Type>{type.name}</Type>
          ))}
        </Types>
        <Img src={pokemon.sprites.front_default} alt="pokemon" />
      </Background>
      <Content>
        <Tabs>
          {tabs.map(({ key, value }) => (
            <Tab active={activeTab === key}>
              <button onClick={() => setActiveTab(key)}>{value}</button>
            </Tab>
          ))}
        </Tabs>
        {activeTab === 'about' && <About pokemon={pokemon} />}
        {activeTab === 'stats' && <Stats pokemon={pokemon} />}
        {activeTab === 'evolution' && <Stats pokemon={pokemon} />}
        {activeTab === 'moves' && <Stats pokemon={pokemon} />}
      </Content>
    </Container>
  ) : (
    <LoadingIndicator />
  );
};

const Img = styled.img`
  width: auto;
  margin: auto;
  display: block;
  height: 300px;
  position: relative;
  z-index: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: white;
`;

const Container = styled.section``;

const Name = styled.h1`
  color: white;
  margin: 24px 0;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  span {
    font-size: 16px;
  }
`;

const Types = styled.div`
  display: flex;
`;

const Type = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 8px 16px;
  border-radius: 24px;
  color: white;
  text-transform: capitalize;
  font-size: 14px;
  &:not(:first-of-type) {
    margin: 0 8px;
  }
`;

const Tabs = styled.ul`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  margin: 0 0 16px;
  padding: 0 24px;

  button {
    padding: 16px;
  }
`;

const Tab = styled.li`
  border-bottom: 2px solid ${({ active }) => (active ? theme.colors.red : 'transparent')};
`;

const Content = styled.main`
  border-radius: 24px;
  margin-top: -40px;
  background: #fff;
  padding: 24px 0;
  position: relative;
`;

const Background = styled.section`
  background-color: ${({ type }) => typeColors[type]};
  height: 440px;
  padding: 24px;
  position: relative;

  svg {
    position: absolute;
    right: -48px;
    bottom: -24px;
  }

  path {
    opacity: 0.25;
    fill: #ffffff;
    fill-opacity: 1;
    stroke: none;
    transform-origin: center center;
  }
`;
