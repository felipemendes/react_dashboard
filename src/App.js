import React, { Component } from 'react'
import './App.css'
import EventsContainer from './components/EventsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Events Dashboard</h2>
        </header>
        <EventsContainer />
      </div>
    );
  }
}

export default App
