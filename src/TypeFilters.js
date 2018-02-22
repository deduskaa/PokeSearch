import React, {Component} from 'react';
import Type from './Type.js';
import './Typefilters.css'

class TypeFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: null,
      pokemonsFromFilter: null,
      gotDataFromFilterSearch: false
    };
  }

  pokemonsFromFilterSearch = (dataFromFilter) => {
    this.setState({pokemonsFromFilter: dataFromFilter, gotDataFromFilterSearch: true});
  }

  getTypes = () => {
    caches.open('types').then( cache => {
      let url = 'http://pokeapi.salestock.net/api/v2/type/'
      let request = new Request(url);
      cache.match(request).then( response => { // Check if there is existing data in cache
        if(response === undefined) {
          // No existing data found, fetch from api and save to cache
          fetch(url).then(response => {
            let responseClone = response.clone();
            caches.open('types').then( cache => {
              cache.add(url, responseClone);
            });
            response.json().then(data => {
              let types = data.results.map((typeObj) => {
                return typeObj.name;
              });
              this.setState(types);
            });
          });
        } else {
          // Data found, get from cache
          response.json().then(data => {
            let types = data.results.map((typeObj) => {
              return typeObj.name;
            });
            this.setState({types: types});
         });
        }
      });
    });
  }

  searchPokemon = (event) => {
    this.props.callbackFromParent(event.target.id);
  }

  componentDidMount() {
    this.getTypes();
  }

  render() {
    let typeElems = this.state.types ? this.state.types.map((type, i) => {
      return <Type key={`type${i}-${type}`} type={type} callbackFromParent={this.pokemonsFromFilterSearch}/>;
    }) : '';

    let pokemonsFromFilter = this.state.gotDataFromFilterSearch ? this.state.pokemonsFromFilter.map((pokemon) => {
      return <button onClick={this.searchPokemon} key={pokemon} id={pokemon} className="TypeFilter-pokeBtn">{pokemon}</button>
    }) : '';

    return (
      <div className="TypeFilters">
        <div className="TypeFilters-container">
          {typeElems}
        </div>
        <div className="TypeFilters-results">
          {pokemonsFromFilter}
        </div>
      </div>
    );
  }
}

export default TypeFilters;
