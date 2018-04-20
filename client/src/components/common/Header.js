import React, {Component} from 'react'
import { Segment, Input, Menu, Button } from 'semantic-ui-react'
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
        .then( res => this.setState({session : res.session}))
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/auth',{
            credentials : 'include'
        })
        const body = response.json()
        return body
    }

    logout = async () => {
        const response = await fetch('/logout',{
            credentials: 'include',
            method : 'post'
        })
        //const body = await response.json()
        if(response.status == 200){
            this.setState({ session: false })
        }
        
    }
    
    render (){
        let item_gs = ''
        let item_fq = ''
        let item_logout = ''
        let item_a = ''
        let item_c = ''
        let item_si = ''
        let item_su = ''
        let item_dash = ''

        if(this.state.session){
            item_logout = <Menu.Item name='log out'><Button onClick={this.logout} basic>Log Out</Button></Menu.Item>
            item_dash = <Menu.Item name='dashboard'><Link className='myLink' to='/usr/dashboard'>DashBoard</Link></Menu.Item>
        }else{
            item_fq = <Menu.Item name='frequent questions' />
            item_gs = <Menu.Item name='get started' />
            item_a = <Menu.Item ><Link to='/about' className='myLink'>About</Link></Menu.Item >   
            item_c = <Menu.Item name='contact' />
            item_si = <Menu.Item><Link to='/register' className='myLink'>Sign up</Link></Menu.Item>
            item_su = <Menu.Item><Link to='/login' className='myLink'>Sign in</Link></Menu.Item>
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
                    {item_dash}
                    {item_gs}
                    {item_fq}
                    {item_a}
                    {item_c}
                    <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>    
                    {item_si}
                    {item_su}
                    {item_logout}
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export {Header}