import React, {Component} from 'react'
import {Sidebar , Menu, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SideBar extends Component{
    
    render(){
        return(
            <Sidebar as={Menu} animation='push' width='thin' visible={this.props.action} icon='labeled' vertical color='purple'>
                <Menu.Item name='home' active>
                    <Link to='/usr/properties/dashboard'>DashBoard</Link>
                </Menu.Item>
                <Menu.Item name='gamepad'>
                    Properties
                </Menu.Item>
                <Menu.Item name='camera'>
                    <Link to='/usr/properties/calendar'>Calendar</Link>
                </Menu.Item>
                <Menu.Item name='camera'>
                    Taxes
                </Menu.Item>
                <Menu.Item name='camera'>
                    History
                </Menu.Item>
                <Menu.Item name='camera'>
                    Tips
                </Menu.Item>
                <Menu.Item name='camera'>
                    Simulator
                </Menu.Item>
                <Menu.Item name='camera'>
                    Settings
                </Menu.Item>
            </Sidebar>
        )
    }
}

export {SideBar}