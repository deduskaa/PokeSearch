import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Pokeball } from '../pokeball.svg';

export const LoadingIndicator = () => (
  <Container>
    <Pokeball />
  </Container>
);

const Container = styled.div`
  text-align: center;
  svg {
    width: 80px;
    height: 80px;
  }

  path {
    opacity: 0.2;
    fill: #000000;
    fill-opacity: 1;
    stroke: none;
    animation: spin 1s infinite;
    transform-origin: center center;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
