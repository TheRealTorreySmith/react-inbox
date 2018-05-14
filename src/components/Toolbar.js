import React from 'react'

class Toolbar extends React.Component {
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
        <a className="btn btn-danger" onClick={this.props.newMessage}>
          <i className="fa fa-plus"></i>
        </a>
        <button className="btn btn-default">
          Mark As Read
        </button>

        <button className="btn btn-default">
          Mark As Unread
        </button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
    )
  }
}

export default Toolbar
