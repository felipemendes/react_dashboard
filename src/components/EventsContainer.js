import React, { Component } from 'react'
import axios from 'axios'

class EventsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/events.json')
        .then(response => {
            console.log(response)
            this.setState({ events: response.data })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
        <div className="">
            Events test
        </div>
        );
    }
}

export default EventsContainer
