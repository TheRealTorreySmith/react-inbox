import React from 'react'

class Message extends React.Component {
render() {
  return (
    <div>
      <div className={`row message ${this.props.message.read ? "read" : "unread"}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2" onChange={this.props.checkClick.bind(null, this.props.message)}>
              <input  type="checkbox" defaultChecked={this.props.message.selected}/>
            </div>
            <div className="col-xs-2" onClick={this.props.starClick.bind(null, this.props.message.id)}>
              { this.props.message.starred ?
              <i  className="star fa fa-star"></i> :
              <i  className="star fa fa-star-o"></i> }
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            {this.props.message.subject}
          </a>
        </div>
      </div>
    </div>
    )
  }
}

export default Message
