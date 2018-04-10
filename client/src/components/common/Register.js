import React, { Component } from 'react'
import { Message, Form, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            first_name : '',
            last_name : '',
            email : '',
            password : '',
            password2: '',
            errors : []
        }
    }

    formData = () => {
        const {first_name, last_name, email, password, password2} = this.state
        let formData = new FormData()
        let payload = {
            'first_name' : first_name,
            'last_name' : last_name,
            'email' : email,
            'password' : password,
            'password2' : password2
        }
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('email', email)
        formData.append('password',password)
        formData.append('password2',password2)
        //formData.append('json', JSON.stringify(payload))
        return formData
    }

    handleClick = () => {
        this.callRequest()
            .then(res => this.setState({errors : res.errors}))
            .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = fetch('/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : this.formData()
        })
        const body = response.json()
        return body
    }

    handleChange = (e, {name}) => {
        this.setState({ [name] : e.target.value})
    }

    render() {
        return (
            <div className='myContainer'>
                <Message
                    attached
                    header='Welcome to our site!'
                    content='Fill out the form below to sign-up for a new account'
                />
                <Form action='/register' className='attached fluid segment' method='post'>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First Name' placeholder='First Name' type='text' name='first_name' onChange={this.handleChange}/>
                        <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' name='last_name' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Password' type='password' name='password' onChange={this.handleChange}/>
                        <Form.Input fluid label='Enter youy Password again' type='password' name='password2' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Input label='Email' placeholder='Email' type='text' name='email' onChange={this.handleChange}/>
                    <Form.Button color='blue' content='Submit'/>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already signed up?<Link className='myLink' to='/login'> Login Here </Link>instead.
            </Message>
            </div>
        )
    }
}

export { Register }