import React, { Component } from 'react'
import axios from 'axios'
import Event from './Event'
import EventForm from './EventForm'
import update from 'immutability-helper'

class EventsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            editingEventId: null,
            notification: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/events.json')
        .then(response => {
            this.setState({ events: response.data })
        })
        .catch(error => console.log(error))
    }

    addNewEvent = () => {
        axios.post('http://localhost:3001/api/v1/events', 
            {
                event: 
                {
                    title: '', 
                    body: ''
                }
                
            }
        )
        .then(response => {
            console.log(response)
            const events = update(this.state.events, { 
                $splice: [[0, 0, response.data]] 
            })
            this.setState({
                events: events,
                editingEventId: response.data.id
            })
        })
        .catch(error => console.log(error))
    }

    updateEvent = (event) => {
        const eventIndex = this.state.events.findIndex(x => x.id === event.id)
        const events = update(this.state.events, {
          [eventIndex]: { $set: event }
        })
        this.setState({
            events: events,
            notification: 'All changes saved'
        })
    }

    resetNotification = () => {
        this.setState({notification: ''})
    }

    enableEditing = (id) => {
        this.setState(
            {editingEventId: id},
            () => { this.title.focus() }
        )
    }

    deleteEvent = (id) => {
        axios.delete(`http://localhost:3001/api/v1/events/${id}`)
        .then(response => {
          const eventIndex = this.state.events.findIndex(x => x.id === id)
          const events = update(this.state.events, { $splice: [[eventIndex, 1]]})
          this.setState({events: events})
        })
        .catch(error => console.log(error))
      }

    render() {
        return (
        <div>
            <div>
                <button className="add-event" onClick={this.addNewEvent}>Add Event</button>
            </div>
            <span className="notification">
                {this.state.notification}
            </span>
            <ul>
                {this.state.events.map((event) => {
                    if(this.state.editingEventId === event.id) {
                        return(<EventForm event={event} key={event.id} updateEvent={this.updateEvent} titleRef={input => this.title = input} resetNotification={this.resetNotification} />)
                    } else {
                        return(<Event event={event} key={event.id} onClick={this.enableEditing} onDelete={this.deleteEvent} />)
                    }
                })}
            </ul>
        </div>
        );
    }
}

export default EventsContainer
