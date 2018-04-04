import React, {Component} from 'react'
import {Segment, Input, Menu} from 'semantic-ui-react'
import logo from './images/logo.png'
import { Link } from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            session : false
        }
    }

    componentWillMount(){
        this.callRequest()
            .then( res => this.setState({session : res.session}) )
            .catch( err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/login')
        const body = await response.json()
        return body
    }

    render (){

        let menu_gs = ''
        let menu_fq = ''
        if(this.state.session){
            menu_gs = <Menu.Item name='get started' /> 
        }else{
            menu_fq = <Menu.Item name='frequent questions' />
        }

        return(
            <Segment basic>
                <Menu className='pad' secondary>
                    <Menu.Item className='brand' header>
                    <img className="ui mini image space-brand" src={logo} alt='Taqz Brand'/>                    
                    <Link to='/'>
                    Taqz
                    </Link>                    
                    </Menu.Item>
                    {menu_gs}
                    {menu_fq}
                    <Menu.Item>
                        <Link to='/about'>About</Link>
                    </Menu.Item>                    
                    <Menu.Item name='contact'/>
                    <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>    
                    <Menu.Item>
                        <Link to='/register'>Sign in</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/login'>Sign up</Link>
                    </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export {Header}