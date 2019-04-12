import React, { Component } from 'react'
import "./main.css";
import shield from "../../assets/shield.png"
import api from "../../services/api"; 

export default class main extends Component {
  state = {
    input: '',
  }
  handleSubmit = async (event) => {
    event.preventDefault()

    const response = await api.post('/folders', {
      title: this.state.input,
    });

    this.props.history.push(`/folders/${response.data._id}`)
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }
  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={shield} alt="" id="main-logo"/>
          <input 
            placeholder="Criar uma pasta"
            value={this.state.input}
            onChange={this.handleInputChange }
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
