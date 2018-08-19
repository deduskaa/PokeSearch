import React from 'react';
import '../css/Type.css';

const Type = props => {
    const searchPokemonByType = event => {
        const url = 'https://pokeapi.co/api/v2/type/' + event.target.id;
        const request = new Request(url);
        fetch(request).then(response => {
            response.json().then(data => {
                let pokemons = data.pokemon.map(pokeObj => {
                    return pokeObj.pokemon.name;
                });
                props.callbackFromParent(pokemons);
            });
        });
    };

    return (
        <button onClick={searchPokemonByType} className={`Type-btn ${props.type}`} id={props.type}>
            {props.type}
        </button>
    );
};

export default Type;
