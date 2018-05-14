import React, { Component } from 'react';
import MailHeader from './components/MailHeader.js'
import Toolbar from './components/Toolbar.js'
import MessageList from './components/MessageList.js'
import NewMessage from './components/NewMessage.js'
import messages from './seeds.json'
import $ from 'jquery'
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
    if(message.starred === true) {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      stateCopy[message.id-1].starred = false
      this.setState({
        messages: stateCopy
      })
    } else {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      stateCopy[message.id-1].starred = true
      this.setState({
        messages: stateCopy
      })
    }
  }

  isDisabled = () => {
    return this.state.messages.filter((x) => (x.selected)).length < 1 ? 'true' : ''
  }

  openBody = (message) => {
    if($(`#message${message.id}`).hasClass('hidden')) {
      $(`#message${message.id}`).removeClass('hidden')
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      stateCopy[message.id-1].read = true
      this.setState({
        messages: stateCopy
      })
    } else {
      $(`#message${message.id}`).addClass('hidden')
    }
  }

  render() {
    return (
      <div className="container">
        <MailHeader />
        <Toolbar isDisabled={this.isDisabled} messages={this.state.messages} />
        <NewMessage />
        <MessageList openBody={this.openBody} checkClick={this.checkClick} starClick={this.starClick} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
