import React, { Component } from 'react';
import MessageList from './components/MessageList.js'
import NewMessage from './components/NewMessage.js'
import Toolbar from './components/Toolbar.js'
import $ from 'jquery'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount = () => {
      this.getData()
    }

// GET MESSAGES DATA
    getData = async () => {
      let messages = await fetch('http://localhost:8082/api/messages')
        .then(response => response.json())
        .then(response => response._embedded.messages)
        .catch(error => (error))

      this.setState({
            messages: [...this.state.messages, messages][0]
          })
    }

// POST NEW MESSAGE TO THE DB
  sendData = async (newMessage) => {
  await fetch(`http://localhost:8082/api/messages`, {
    method: 'POST',
    body: JSON.stringify(newMessage),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then(response => response.json())
  .catch(error => (error))
    this.setState({
          messages: [...this.state.messages, newMessage][0]
        })
  }

// PATCH MESSAGE FUNCTION CALL
  patchData = async (patchMessage) => {
  await fetch(`http://localhost:8082/api/messages`, {
    method: 'PATCH',
    body: JSON.stringify(patchMessage),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then(response => response.json())
  .catch(error => (error))
}

// DELETE MESSAGES FUNCTION CALL
  deleteData = async (deleteMessage) => {
  await fetch(`http://localhost:8082/api/messages`, {
    method: 'PATCH',
    body: JSON.stringify(deleteMessage),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then(response => response.json())
  .catch(error => (error))
  }

// ON CHECK CLICK
  checkClick = (message) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
    let selectedObject = stateCopy.filter((x) => x.id === message.id)
      if(message.selected === true) {
      selectedObject[0].selected = false
      } else {
        selectedObject[0].selected = true
      }
      this.setState({
        messages: stateCopy
      })
  }

// ON STAR CLICK
  starClick = (message) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
    let selectedObject = stateCopy.filter((x) => x.id === message.id)
      if(message.starred === true) {
      selectedObject[0].starred = false
      const patchMessage = {
        "messageIds": [selectedObject[0].id],
        "command": "star",
        "star": false
      }
      this.patchData(patchMessage)
    } else {
      selectedObject[0].starred = true
      const patchMessage = {
        "messageIds": [selectedObject[0].id],
        "command": "star",
        "star": true
      }
      this.patchData(patchMessage)
    }
    this.setState({
      messages: stateCopy
    })
  }

  isDisabled = () => {
    return this.state.messages.filter((x) => (x.selected)).length < 1 ? 'true' : ''
  }

// OPENS THE BODY OF THE MESSAGE WHEN CLICKING ON THE SUBJECT
  openBody = (message) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state.messages))
    if($(`#message${message.id}`).hasClass('hidden')) {
      $(`#message${message.id}`).removeClass('hidden')
      stateCopy[message.id-1].read = true
      const patchMessage = {
        "messageIds": [message.id],
        "command": "read",
        "read": false
      }
      this.patchData(patchMessage)
    } else {
      const patchMessage = {
        "messageIds": [message.id],
        "command": "read",
        "read": true
      }
      this.patchData(patchMessage)
      $(`#message${message.id}`).addClass('hidden')
    }
    this.setState({
      messages: stateCopy
    })
  }

//  DELETES THE MESSAGES THAT ARE SELECTED
  deleteMessage = () => {
    let stateJSONCopy = JSON.parse(JSON.stringify(this.state.messages))
    let messagesToDelete = stateJSONCopy.filter((selectedMessages) => selectedMessages.selected)
    let idsToDelete = messagesToDelete.map((ids) => ids.id)
    let stateCopy = stateJSONCopy.filter((allMessages) => !idsToDelete.includes(allMessages.id))
    const deleteMessage = {
      "messageIds": idsToDelete,
      "command": "delete",
      "delete": true
    }
    this.deleteData(deleteMessage)
      this.setState({
        messages: stateCopy
      })
  }

// APPLIES A LABEL TO THE SELECTED MESSAGES
  applyLabel = (label) => {
    let newState = this.state.messages.map((message) => {
        message.selected && !message.labels.includes(label) ? message.labels = message.labels.concat(label) : message.labels
        return message
    })
    let ids = newState.filter((message) => message.selected).map(x => x.id)
    const patchMessage = {
      "messageIds": ids,
      "command": "addLabel",
      "label": label
    }
    this.patchData(patchMessage)
    this.setState({
      messages: newState
    })
  }

// DELETES THE LABEL FROM THE SELECTED MESSAGES
  deleteLabel = (label) => {
    let newState = this.state.messages.map((message) => {
        message.selected && message.labels.includes(label) ? message.labels = message.labels.filter((x) => x !== label) : message.labels
        return message
    })
    let ids = newState.filter((message) => message.selected).map(x => x.id)
    const patchMessage = {
      "messageIds": ids,
      "command": "removeLabel",
      "label": label
    }
    this.patchData(patchMessage)
    this.setState({
      messages: newState
    })
  }

// MARKS THE SELECTED MESSAGES AS READ
  markAsRead = () => {
    let newState = this.state.messages.map((message) => {
      message.selected ? message.read = true : message.read
      return message
    })
    let ids = newState.filter((message) => message.selected).map(x => x.id)
    const patchMessage = {
      "messageIds": ids,
      "command": "read",
      "read": true
    }
    this.patchData(patchMessage)
    this.setState({
      messages: newState
    })
  }

// MARKS THE SELECTED MESSAGES AS UNREAD
  markAsUnread = () => {
    let newState = this.state.messages.map((message) => {
      message.selected ? message.read = false : message.read
      return message
    })
    let ids = newState.filter((message) => message.selected).map(x => x.id)
    const patchMessage = {
      "messageIds": ids,
      "command": "read",
      "read": false
    }
    this.patchData(patchMessage)
    this.setState({
      messages: newState
    })
  }

// SELECTS ALL MESSAGES
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

// RENDERS THE COMPONENTS
  render() {
    return (
      <div className="container">
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
        <NewMessage
          sendData={this.sendData}
        />
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
