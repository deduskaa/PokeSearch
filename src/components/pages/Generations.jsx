import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import styled from 'styled-components';

const generations = [
  { text: 'Generation I' },
  { text: 'Generation II' },
  { text: 'Generation III' },
  { text: 'Generation IV' },
  { text: 'Generation V' },
  { text: 'Generation VI' }
];

export const Generations = () => {
  return (
    <Buttons>
      {generations.map(({ text }) => (
        <li>
          <Button>{text}</Button>
        </li>
      ))}
    </Buttons>
  );
};

const Buttons = styled.ul`
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
  border-radius: 16px;
  box-shadow: 0 5px 20px #ddd;
  color: #333;
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
