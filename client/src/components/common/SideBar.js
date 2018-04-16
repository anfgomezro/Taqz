import React, {Component} from 'react'
import {Sidebar , Menu} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SideBar extends Component{
    
    render(){
        return(
            <Sidebar as={Menu} animation='push' width='thin' visible={this.props.action} icon='labeled' vertical color='purple'>
                <Link className='anchor' to='/usr/dashboard'>DashBoard</Link>
                <Link className='anchor' to='/usr/dashboard/properties'>Properties</Link>
                <Link className='anchor' to='/usr/dashboard/calendar'>Calendar</Link>
                <Link className='anchor' to='/usr/dashboard/taxes'>Taxes</Link>
                <Link className='anchor' to='/usr/dashboard/incomes'>Incomes</Link>            
                <Link className='anchor' to='/usr/dashboard/expenses'>Expenses</Link>                            
                <Menu.Item  name='simulator'>
                    Simulator
                </Menu.Item>
                <Link className='anchor' to='/usr/dashboard/properties'>Settings</Link>
            </Sidebar>
        )
    }
}

export {SideBar}