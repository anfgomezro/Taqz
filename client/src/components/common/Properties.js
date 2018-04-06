import React, {Component} from 'react'
import { Sidebar, Segment, Header, Button, Message } from 'semantic-ui-react';
import {SideBar} from './'

class Properties extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
            name : ''
        }
    }

    componentWillMount(){
        this.callRequest()
        .then( res => this.setState({ name : res.name}))
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/properties',{
            credentials : 'include'
        })
        const body = await response.json()
        return body
    }

    toggleMenu = () => {
        this.setState({visible : !this.state.visible})
    }

    render(){
        return(
            <div>
                <Button onClick={this.toggleMenu}>Menu</Button>
                <Sidebar.Pushable as={Segment}>
                    <SideBar action={this.state.visible}/>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Message positive>
                                <Message.Header>{this.state.name}</Message.Header>
                                <p>Welcome to<b> Taqz</b>. Getting Started</p>
                            </Message>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export {Properties}