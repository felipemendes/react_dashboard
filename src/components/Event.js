import React, { Component } from 'react'

class Event extends Component {

  handleClick = () => {
    this.props.onClick(this.props.event.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.event.id)
  }

  render () {
    return(
      <tr>
        <td>
          <h4 onClick={this.handleClick}>
            {this.props.event.title}
          </h4>
        </td>
        <td>
          <p onClick={this.handleClick}>
            {this.props.event.body}
          </p>
        </td>
        <td>
          <span onClick={this.handleDelete}>Delete</span>
        </td>
      </tr>
    )
  }
}

export default Event