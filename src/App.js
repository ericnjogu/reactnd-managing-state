import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  randomValue = () => Math.floor(Math.random() * 100);
  state = {
    /* TODO - how to merge in maps so that we can avoid repeating the first three entries
    	the technique in https://stackoverflow.com/a/32000937/315385 did now work
    */
      value1 : this.randomValue(),
      value2 : this.randomValue(),
      value3: this.randomValue(),
      numQuestions: 0,
      numCorrect: 0,
  };

	constructor() {
      super();
      this.state.proposedAnswer = Math.floor(Math.random() * 3) + this.state.value1 + this.state.value2 + this.state.value3;
	  this.state.correctAnswer = this.state.value1 + this.state.value2 + this.state.value3;
	}

	answer = (answer) => {
      if ((this.state['proposedAnswer'] === this.state['correctAnswer'] && answer === true) 
          || (this.state['proposedAnswer'] !== this.state['correctAnswer'] && answer !== true)) {
        this.setState(
          {
            numCorrect: this.state.numCorrect + 1,
          }
      	);
      }
      
      let newState = {
          value1 : this.randomValue(),
          value2 : this.randomValue(),
          value3: this.randomValue(),
          numQuestions: this.state.numQuestions + 1,
        }
      // using this since it did not work to merge two maps to create the new state object
      newState.proposedAnswer = Math.floor(Math.random() * 3) + newState.value1 + newState.value2 + newState.value3;
      newState.correctAnswer = newState.value1 + newState.value2 + newState.value3;
   
      // merging maps courtesy of https://stackoverflow.com/a/32000937/315385
      this.setState(
        newState
      );
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Exercise - Managing State</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">
    			{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
          </div>
          <button onClick={() => this.answer(true)}>True</button>
          <button onClick={() => this.answer(false)}>False</button>
          <p className="text">
            Your Score: {this.state.numCorrect}/{this.state.numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
