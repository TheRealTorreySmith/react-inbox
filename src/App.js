import React, { Component } from 'react';
import MailHeader from './components/MailHeader.js'
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import messages from './seeds.json'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: messages,
      showModal: false
    }
  }
  checkClick = (message) => {
    //   this.setState({
    //     ...this.state,
    //     selected: true
    //   })
    console.log(message)
    }
    starClick = (message) => {
      //   this.setState({
      //     ...this.state,
      //     selected: true
      //   })
      }
    newMessage = () => {
      console.log('new message')
    }
  render() {
    return (
      <div className="container">
        <MailHeader />
        <Toolbar newMessage={this.newMessage} messages={this.state.messages}/>
        <MessageList checkClick={this.checkClick} starClick={this.starClick} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
