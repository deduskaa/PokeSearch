import React, {Component} from 'react';
import './App.css';
import Form from './Form.js'
import Card from './Card.js'
import TypeFilters from './TypeFilters.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotFormData: false,
      valueFromForm: null,
      loading: false,
      pokemonData: {}
    };
  }

  myCallback = (dataFromChild) => {
    this.searchPokemon(dataFromChild);
  }

  setPokemonData = data => {
    console.log(data);
    
    let pokemon = {
      pokemon_id: data.id,
      pokemon: data.name,
      types: data.types.map((d) => {return d.type.name}).reverse(),
      picture: data['sprites']['front_default'],
      species_url: data.species.url,
      stats: data.stats,
      height: data.height,
      weight: data.weight,
      happiness: data.base_happiness,
    }
    caches.open('pokemon').then( cache => {
      let request = new Request(pokemon.species_url);
      cache.match(request).then( response => { // Check if there is existing data in cache
        if(response === undefined) {
          let url = pokemon.species_url;
          // Get additional data that was not in the original call
          fetch(url).then(results => {
            let responseClone = results.clone();
            caches.open('pokemon').then( cache => {
              cache.add(url, responseClone);
            });
            results.json()
            .then(data => {this.setAdditionalPokemonData(data, pokemon)});
          });
        } else {
          response.json()
          .then(data => {
            console.log(data);
            
            this.setAdditionalPokemonData(data, pokemon);
          });
        }
      });
    });
  }

  setAdditionalPokemonData = (data, pokemon) => {
    pokemon.genus = data.genera[2]['genus'];
    pokemon.capture_rate = data.capture_rate;
    
    //Loop through descriptions and search for the first english one
    for (let i = 0; i < data['flavor_text_entries'].length; i++) {
      if (data['flavor_text_entries'][i]['language']['name'] === 'en') {
        pokemon.description = data['flavor_text_entries'][i]['flavor_text'];
        this.setState({loading: false, gotFormData: true, pokemonData: pokemon});
        break;
      }
    }
  }


  searchPokemon = (pokemonID) => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonID;
    this.setState({loading: true});

    caches.open('pokemon').then( cache => {
      let request = new Request(url);
      cache.match(request).then( response => { // Check if there is existing data in cache
        if(response === undefined) {
          // No existing data found, fetch from api and save to cache
          fetch(url).then(response => {
            let responseClone = response.clone();
            caches.open('pokemon').then( cache => {
              cache.add(url, responseClone);
            });
            response.json().then(data => { this.setPokemonData(data) });
          });
        } else {
          // Data found, get from cache
          response.json().then(data => { this.setPokemonData(data) });
        }
      });
    });

  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Search for your pokemons</h1>
        <Form callbackFromParent={this.myCallback} loading={this.state.loading}/>
        <TypeFilters callbackFromParent={this.myCallback}/>
        {this.state.gotFormData ? <Card pokemonInfo={this.state.pokemonData} callbackFromParent={this.myCallback}/> : ''}
      </div>
    );
  }
}

export default App;
