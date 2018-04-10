import React, { Component } from 'react'
import { Sidebar, Segment, Header, Button, Message, Icon } from 'semantic-ui-react';
import { SideBar, Calendar, Properties } from './'
import { Switch, Route } from 'react-router-dom'

class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: ''
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

    toggleMenu = () => {
        this.setState({ visible: !this.state.visible })
    }

    render(){
        return(
            <div>
                <Button icon onClick={this.toggleMenu} basic><Icon name='list layout' /></Button>
                <Sidebar.Pushable className='main'>
                    <SideBar action={this.state.visible} />
                    <Sidebar.Pusher className='main--content'>
                        <Switch>
                            <Route path='/usr/dashboard/properties' component={Properties} />
                            <Route path='/usr/dashboard/calendar' component={Calendar} />
                        </Switch>
                        <Segment basic >
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

export {DashBoard}