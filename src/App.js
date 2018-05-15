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
      let selectedObject = stateCopy.filter((x) => x.id === message.id)
      selectedObject[0].selected = false
      this.setState({
        messages: stateCopy
      })
      } else {
        let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
        let selectedObject = stateCopy.filter((x) => x.id === message.id)
        selectedObject[0].selected = true
        this.setState({
          messages: stateCopy
        })
      }
  }
  starClick = (message) => {
    if(message.starred === true) {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      let selectedObject = stateCopy.filter((x) => x.id === message.id)
      selectedObject[0].starred = false
      this.setState({
        messages: stateCopy
      })
    } else {
      let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
      let selectedObject = stateCopy.filter((x) => x.id === message.id)
      selectedObject[0].starred = true
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

  deleteMessage = () => {
    let stateJSONCopy = JSON.parse(JSON.stringify(this.state.messages))
    let messagesToDelete = stateJSONCopy.filter((selectedMessages) => selectedMessages.selected)
    let idsToDelete = messagesToDelete.map((ids) => ids.id)
    let stateCopy = stateJSONCopy.filter((allMessages) => !idsToDelete.includes(allMessages.id))
      console.log(stateCopy)
      this.setState({
        messages: stateCopy
      })
  }

  applyLabel = (label) => {
    let newState = this.state.messages.map((message) => {
        message.selected && !message.labels.includes(label) ? message.labels = message.labels.concat(label) : message.labels
        return message
    })
    this.setState({
      messages: newState
    })
  }

  deleteLabel = (label) => {
    let newState = this.state.messages.map((message) => {
        message.selected && message.labels.includes(label) ? message.labels = message.labels.filter((x) => x !== label) : message.labels
        return message
    })
    this.setState({
      messages: newState
    })
  }

  markAsRead = () => {
    let newState = this.state.messages.map((message) => {
      message.selected ? message.read = true : message.read
      return message
    })
    this.setState({
      messages: newState
    })
  }

  markAsUnread = () => {
    let newState = this.state.messages.map((message) => {
      message.selected ? message.read = false : message.read
      return message
    })
    this.setState({
      messages: newState
    })
  }

  selectAll = () => {
    if(this.state.messages.filter(m => m.selected).length < this.state.messages.length) {
      let newState = this.state.messages.map((message) => {
        message.selected = true
        return {...message, selected: true}
      })
      this.setState({
        messages: newState
      })
    } else {
      let newState = this.state.messages.map((message) => {
        message.selected = false
        return {...message, selected: false}
      })
      this.setState({
        messages: newState
      })
    }
  }

  render() {
    return (
      <div className="container">
        <MailHeader />
        <Toolbar
          isDisabled={this.isDisabled}
          messages={this.state.messages}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          deleteLabel={this.deleteLabel}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          selectAll={this.selectAll}
        />
        <NewMessage />
        <MessageList
          openBody={this.openBody}
          checkClick={this.checkClick}
          starClick={this.starClick}
          messages={this.state.messages}
        />
      </div>
    )
  }
}

export default App;
