import React from 'react'
import $ from 'jquery'

class Toolbar extends React.Component {

  newMessage = () => {
    if($('#modal').hasClass('hidden')) {
      $('#modal').removeClass('hidden')
    } else {
      $('#modal').addClass('hidden')
    }
    if($('#new-message-button').hasClass('hidden')) {
      $('#new-message-button').removeClass('hidden')
    } else {
      $('#new-message-button').addClass('hidden')
    }
    if($('#cancel-new-message-button').hasClass('hidden')) {
      $('#cancel-new-message-button').removeClass('hidden')
    } else {
      $('#cancel-new-message-button').addClass('hidden')
    }
  }

setLabel = (event) => {
  let label = event.target.value
  return this.props.applyLabel(label)
}

render() {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{this.props.messages.filter((messages) => (messages.read === false)).length}</span>
          { this.props.messages.filter((messages) => (messages.read === false)).length === 1 ?
            "unread message" :
            "unread messages" }
        </p>

        {/* Compose New Message */}
        <a id="new-message-button" type="button" className="btn btn-success" onClick={this.newMessage}>
          <i className="fa fa-plus"></i>
        </a>

        {/* Cancel New Message */}
        <a id="cancel-new-message-button" type="button" className="btn btn-danger hidden" onClick={this.newMessage}>
          <i className="fa fa-minus"></i>
        </a>

        <button className={`btn btn-default ${this.props.messages.filter((messages) =>
          (messages.selected)).length > 0 ? 'hidden' : '' }`}>
          <i className="fa fa-square-o"></i>
        </button>

        <button className={`btn btn-default ${this.props.messages.filter((messages) =>
          (messages.selected)).length < 1 ? 'hidden' : '' }`}>
          <i className="fa fa-minus-square-o"></i>
        </button>

        <button className={`btn btn-default ${this.props.messages.filter((messages) =>
          (messages.selected)).length < 1 ? 'disabled' : '' }`}>
          Mark As Read
        </button>

        <button className={`btn btn-default ${this.props.messages.filter((messages) =>
          (messages.selected)).length < 1 ? 'disabled' : '' }`}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={this.setLabel} disabled={this.props.isDisabled()}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={this.props.isDisabled()}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={this.props.deleteMessage.bind(null, this.props.messages)}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
    )
  }
}

export default Toolbar
