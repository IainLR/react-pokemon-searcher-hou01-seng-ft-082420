import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

let pokeUrl = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  constructor(){
    super()
    this.state = {
      pokemon: [],
      displayPokemon: [],
      search: ''
    }
  }

  componentDidMount(){
    fetch(pokeUrl)
    .then(res=>res.json())
    .then(pokemon=> this.setState({
      pokemon,
      displayPokemon: pokemon
    }))
  }

  handleSearch = (e) => {
    console.log(e, e.target.value)
    this.setState({
      search: e.target.value
    })
    this.executeSearch(e.target.value)
  }

  executeSearch = (search) => {
    console.log("this is a search", search)
    let results = [...this.state.pokemon].filter(pokemon => pokemon.name.includes(search))
    console.log(results)
    this.setState({
      displayPokemon: results
    })
  }

  addNewPokemon = (pokemon) => {
    console.log("submition TEST!", pokemon)
    let pokemonObj = {
      name: pokemon.name,
      hp: parseInt(pokemon.hp),
      sprites: {
        front: pokemon.frontUrl,
        back: pokemon.backUrl
      }
    }
    fetch(pokeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(pokemonObj)
    }).then(res=> res.json())
    .then(newPokemon => {
      this.setState({
        pokemon: [...this.state.pokemon, newPokemon],
        displayPokemon: [...this.state.displayPokemon, newPokemon]
      })
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addNewPokemon = {this.addNewPokemon}/>
        <br />
        <Search handleSearch = {this.handleSearch}/>
        <br />
        <PokemonCollection pokemon={this.state.displayPokemon}/>
      </Container>
    )
  }
}

export default PokemonPage
