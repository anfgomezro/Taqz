import React, {Component} from 'react'
import {Segment, Input, Menu} from 'semantic-ui-react'
import logo from './images/logo.png'
import { Link } from 'react-router-dom'

class Header extends Component{

    render (){
        return(
            <Segment basic>
                <Menu className='pad' secondary>
                    <Menu.Item className='brand' header>
                    <img className="ui mini image space-brand" src={logo}/>                    
                    <Link to='/'>
                    Taqz
                    </Link>                    
                    </Menu.Item>
                    <Menu.Item name='get started'/>
                    <Menu.Item name='frequent questions'/>
                    <Menu.Item>
                        <Link to='/about'>About</Link>
                    </Menu.Item>                    
                    <Menu.Item name='contact'/>
                    <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>    
                    <Menu.Item>
                        <Link to='/login'>Login</Link>
                    </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export {Header}