import React, { Component } from 'react'
import { Sidebar, Button, Icon } from 'semantic-ui-react';
import { SideBar, CalendarTax, Properties, Base } from './'
import { Switch, Route } from 'react-router-dom'

class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
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
                            <Route path='/usr/dashboard/calendar' component={CalendarTax} />
                            <Route path='/usr/dashboard' component={Base} />
                        </Switch>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export {DashBoard}