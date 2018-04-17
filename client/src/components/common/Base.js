import React, {Component} from 'react'
import {Segment, Message, Header} from 'semantic-ui-react'

class Base extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : ''
        }
    }

    componentWillMount() {
        this.callRequest()
            .then(res => this.setState({ name: res.name }))
            .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/dashboard', {
            credentials: 'include'
        })
        const body = await response.json()
        return body
    }

    render(){
        return(
            <Segment className='main--content' basic >
                <Header as='h3'>Application Content</Header>
                <Message color='yellow'>
                    <Message.Header>{this.state.name}</Message.Header>
                    <p>Welcome to<b> Taqz</b>. Getting Started</p>
                </Message>
            </Segment>
        )
    }
}

export {Base}