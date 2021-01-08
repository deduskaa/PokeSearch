import React from 'react';
import styled from 'styled-components';

export const About = ({ pokemon }) => {
  const englishSpecies = pokemon.genera.find(({ language }) => language.name === 'en');
  console.log('About -> englishSpecies', englishSpecies);
  const rows = [
    { key: 'Species', value: englishSpecies.genus },
    { key: 'Height', value: pokemon.height },
    { key: 'Weight', value: pokemon.weight },
    { key: 'Abilities', value: pokemon.abilities.map(({ ability }) => ability.name).join(', ') },
  ];

  const breedingRows = [
    { key: 'Egg Groups', value: pokemon.egg_groups.map(({ name }) => name).join(', ') },
    { key: 'Egg Cycle', value: englishSpecies.genus },
  ];
  return (
    <Container>
      <ul>
        {rows.map(({ key, value }) => (
          <Row key={key}>
            <Key>{key}</Key> <Value>{value}</Value>
          </Row>
        ))}
      </ul>

      <H2>Breeding</H2>
      <ul>
        <Row>
          <Key>Gender</Key> <Value>male: i female: i</Value>
        </Row>
        {breedingRows.map(({ key, value }) => (
          <Row key={key}>
            <Key>{key}</Key> <Value>{value}</Value>
          </Row>
        ))}
      </ul>
    </Container>
  );
};

const H2 = styled.h2`
  font-size: 18px;
  margin: 32px 0 16px;
`;

const Container = styled.ul`
  padding: 0 24px;
`;

const Row = styled.li`
  margin: 16px 0;
  display: grid;
  grid-template-columns: 160px 1fr;
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
