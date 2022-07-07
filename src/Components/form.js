import React, { Component } from "react";
import Card from "./Card";


class Form extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      img: '#',
    }
  }
  
  /*
  async componentDidMount(){
    await this.fetchJale()
  }*/

  fetchJale = async () => {
    //let res = await fetch('https://pokeapi.co/api/v2/pokemon/venusaur')
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
    let data = await res.json()

    //console.log(data['sprites']['front_default'])
    console.log(data.name);
    console.log(data.sprites.front_default)
    this.setState({
      img: data.sprites.front_default
    })
  }
  

  handleName = event => {
    this.setState({
      name: event.target.value
    })
  }
  

  handleSubmit = event =>{
    this.fetchJale()
    //limpiar
    this.setState({
      name: '',
    })
    event.preventDefault()
  }
  
    

    render() {
        return (
        <div className="center-container">          
          <div className="buscar">
        <form onSubmit={this.handleSubmit}>   
        <br/> 
            <input 
                type="text"
                className="nombre"
                placeholder="Nombre del Pokemon"
                value={this.state.name}
                onChange={this.handleName}
            /><br/><br/>
            <button type="submit" className="btn" >Buscar</button>
        </form>
        <img className="center-container" src={this.state.img}></img>
        <label>{this.state.name}</label>
          </div>
        </div>
        );
    }

}


export default Form