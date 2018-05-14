import React from 'react'
import Message from './Message.js'

class MessageList extends React.Component {
  render(){
    return (
      <div>
        {this.props.messages.map((message, id) => (
          <Message
            key={id}
            openBody={this.props.openBody}
            checkClick={this.props.checkClick}
            starClick={this.props.starClick}
            message={message}
           />
        ))}
      </div>
    )
  }
}

export default MessageList
