import React, {Component} from 'react'
import {Sidebar , Menu} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SideBar extends Component{
    
    render(){
        return(
            <Sidebar as={Menu} animation='push' width='thin' visible={this.props.action} icon='labeled' vertical color='purple'>
                <Menu.Item name='home' active>
                    <Link to='/usr/dashboard'>DashBoard</Link>
                </Menu.Item>
                <Menu.Item name='gamepad'>
                    <Link to='/usr/dashboard/properties'>Properties</Link>
                </Menu.Item>
                <Menu.Item name='camera'>
                    <Link to='/usr/dashboard/calendar'>Calendar</Link>
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