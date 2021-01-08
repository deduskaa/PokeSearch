import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme';

export const Stats = ({ pokemon }) => {
  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  };

  const total = pokemon.stats
    .map(({ base_stat }) => base_stat)
    .reduce((acc, current) => acc + current);

  return (
    <Container>
      {pokemon.stats.reverse().map(({ stat, base_stat }) => (
        <Row key={stat.name}>
          <Key>{statNames[stat.name]}</Key> <span>{base_stat}</span> <Bar value={base_stat} />
        </Row>
      ))}
      <Row>
        <Key>Total</Key> <span>{total}</span> <Bar value={total} />
      </Row>
    </Container>
  );
};

const Container = styled.ul``;
const Row = styled.li`
  align-items: center;
  display: grid;
  grid-template-columns: 120px 40px 1fr;
  margin: 24px;
`;

const Key = styled.p`
  color: #717171;
  margin: 0;
`;

const Value = styled.p`
  color: #333;
  margin: 0;
  text-transform: capitalize;
`;

const Bar = styled.div`
  height: 4px;
  position: relative;
  background-color: #ddd;
  overflow: hidden;

  &:after {
    content: '';
    background-color: ${({ value }) => (value < 50 ? theme.colors.red : theme.colors.green)};
    position: absolute;
    top: 0;
    height: 4px;
    width: ${({ value }) => value}%;
  }
`;
