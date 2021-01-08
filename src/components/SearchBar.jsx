import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import { Redirect, useHistory } from 'react-router-dom';

export const SearchBar = (props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const redirect = (e) => {
    e.preventDefault();
    console.log(value);

    history.push(`/pokemon/${value}`);
  };

  return (
    <Form id="pokemon-search" onSubmit={redirect}>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search Pokemon, Move, Ability etc"
      />
    </Form>
  );
};

const Form = styled.form`
  margin: 32px 0;
`;

const Button = styled.button`
  background-color: ${theme.colors.red};
  border: none;
  color: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
  height: 48px;
  outline: none;
  padding: 16px 24px;
  text-transform: uppercase;
  transition: all 0.22s;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border-radius: 24px;
  border: none;
  height: 56px;
  outline: none;
  padding: 0 16px;
  width: 100%;
  font-size: 18px;
`;
