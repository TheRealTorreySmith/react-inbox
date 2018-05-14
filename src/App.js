import React, { Component } from 'react';
import MailHeader from './components/MailHeader.js'
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import NewMessage from './components/NewMessage.js'
import messages from './seeds.json'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: messages
    }
  }
  checkClick = (message) => {
    if(message.selected === true) {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      stateCopy[message.id-1].selected = false
      this.setState({
        messages: stateCopy
      })
    } else {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      stateCopy[message.id-1].selected = true
      this.setState({
        messages: stateCopy
      })
    }
  }
    starClick = (message) => {
      //   this.setState({
      //     ...this.state,
      //     selected: true
      //   })
      }

  render() {
    return (
      <div className="container">
        <MailHeader />
        <Toolbar messages={this.state.messages} />
        <NewMessage />
        <MessageList checkClick={this.checkClick} starClick={this.starClick} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
