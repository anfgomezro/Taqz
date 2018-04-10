import React, {Component} from 'react'
import {Sidebar , Menu} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SideBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeItem : 'home'
        }
    }

    handleClick = (e, {name}) => this.setState({activeItem : name})
    
    render(){
        const {activeItem} = this.state

        return(
            <Sidebar as={Menu} animation='push' width='thin' visible={this.props.action} icon='labeled' vertical color='purple'>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleClick}>
                    <Link to='/usr/dashboard'>DashBoard</Link>
                </Menu.Item>
                <Menu.Item name='properties' active={activeItem === 'properties'} onClick={this.handleClick}>
                    <Link to='/usr/dashboard/properties'>Properties</Link>
                </Menu.Item>
                <Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleClick}>
                    <Link to='/usr/dashboard/calendar'>Calendar</Link>
                </Menu.Item>
                <Menu.Item name='taxes' active={activeItem === 'taxes'} onClick={this.handleClick}>
                    Taxes
                </Menu.Item>
                <Menu.Item name='history' active={activeItem === 'history'} onClick={this.handleClick}>
                    History
                </Menu.Item>
                <Menu.Item name='tips' active={activeItem === 'tips'} onClick={this.handleClick}> 
                    Tips
                </Menu.Item>
                <Menu.Item name='simulator' active={activeItem === 'simulator'} onClick={this.handleClick}>
                    Simulator
                </Menu.Item>
                <Menu.Item name='settings' active={activeItem === 'settings'} onClick={this.handleClick}>
                    Settings
                </Menu.Item>
            </Sidebar>
        )
    }
}

export {SideBar}