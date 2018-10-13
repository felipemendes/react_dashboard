import React, { Component } from 'react'
import axios from 'axios'

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        title: this.props.event.title,
        body: this.props.event.body
    }
  }

  handleInput = (e) => {
        this.props.resetNotification()
        this.setState({
            [e.target.name]: e.target.value
        })
  }

  handleBlur = () => {
    const event = {
      title: this.state.title,
      body: this.state.body
    }
    axios.put(
        `http://localhost:3001/api/v1/events/${this.props.event.id}`,
        {
            event: event
        })
        .then(response => {
            console.log(response)
            this.props.updateEvent(response.data)
        })
    .catch(error => console.log(error))
}

  render() {
    return (
      <td>
        <form onBlur={this.handleBlur} >
          <input className='input' type="text" name="title" placeholder='Enter a Title' value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef} />
          <textarea className='input' name="body" placeholder='Event description' value={this.state.body} onChange={this.handleInput}></textarea>
        </form>
      </td>
    );
  }
}

export default EventForm