import React, {Component} from 'react';
import './Form.css';
import FontAwesome from 'react-fontawesome';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    // this.searchPokemon = this.searchPokemon.bind(this);
    // this.setPokemonData = this.setPokemonData.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  sendValueToParent = (event) => {
    event.preventDefault();
    this.props.callbackFromParent(this.state.value);
  }

  // setPokemonData = data => {
  //   let pokemon = {
  //     pokemon_id: data.id,
  //     pokemon: data.name,
  //     types: data.types.map((d) => {return d.type.name}).reverse(),
  //     picture: data['sprites']['front_default'],
  //     species_url: data.species.url,
  //     stats: data.stats
  //   }
  //   this.props.callbackFromParent(pokemon); // Send pokemons data to App.js
  // 
  //   // Get additional data that was not in the original call
  //   fetch(pokemon.species_url).then(results => {
  //     results.json()
  //     .then(data => {
  //       console.log(data);
  //       pokemon.genus = data.genera[0]['genus'];
  // 
  //       //Loop through descriptions and search for the first english one
  //       for (let i = 0; i < data['flavor_text_entries'].length; i++) {
  //         if (data['flavor_text_entries'][i]['language']['name'] === 'en') {
  //           pokemon.description = data['flavor_text_entries'][i]['flavor_text']
  //           this.setState({loading: false});
  //           break;
  //         }
  //       }
  //       this.props.callbackFromParent(pokemon);
  //     });
  //   });
  // }
  // 
  // searchPokemon = (event) => {
  //   event.preventDefault();
  //   let url = "http://pokeapi.salestock.net/api/v2/pokemon/" + this.state.value;
  //   this.setState({loading: true});
  // 
  //   caches.open('pokemon').then( cache => {
  //     let request = new Request(url);
  // 
  //     cache.match(request).then( response => { // Check if there is existing data in cache
  //       if(response === undefined) {
  //         // No existing data found, fetch from api and save to cache
  //         fetch(url).then(response => {
  //           let responseClone = response.clone();
  //           caches.open('pokemon').then( cache => {
  //             cache.add(url, responseClone);
  //           });
  //           response.json().then(data => { this.setPokemonData(data) });
  //         });
  //       } else {
  //         // Data found, get from cache
  //         response.json().then(data => { this.setPokemonData(data) });
  //       }
  //     });
  //   });
  // 
  // }

  render() {
    return (
      <form id="pokemon-search" onSubmit={this.sendValueToParent}>
        <label>Name or ID:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        {this.props.loading ? <FontAwesome name="spinner" spin/> : <input type="submit" value="Submit"/>}
      </form>
    );
  }
}

export default Form;
