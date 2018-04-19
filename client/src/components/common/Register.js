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
            errors : [], 
            emailS : false,
            fnS : false,
            emailnS : false,
            lnS: false,
            pS : false,
            pnmS : false,
            check : false
        }
    }

    serialize = (form) => {
        let arr = []
        for (let i of form) {
            let a = i[0] + '=' + encodeURIComponent(i[1])
            arr.push(a)
        }
        return arr.join('&').replace(/%20/g, '+')
    }

    formData = () => {
        const {first_name, last_name, email, password, password2} = this.state
        let formData = new FormData()
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('email', email)
        formData.append('password',password)
        formData.append('password2',password2)
        return formData
    }

    handleClick = () => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = this.formData()
        fetch('/register', {
            credentials: 'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if(res.status){
                    this.setState({ check : res.status})
                    this.setState({ fnS: false })
                    this.setState({ emailS: false })
                    this.setState({ emailnS: false })
                    this.setState({ lnS: false })
                    this.setState({ pS: false })
                    this.setState({ pnmS: false })
                }else{
                    for (let i of res.errors) {
                        console.log(i.msg)
                        let status = i.msg
                        if (status == 'fnS') {
                            this.setState({ fnS: true })
                        } else if (status == 'emailS') {
                           this.setState({ emailS: true })
                        } else if (status == 'emailnS') {
                            this.setState({ emailnS: true })
                        } else if (status == 'lnS') {
                            this.setState({ lnS: true })
                        } else if (status == 'pS') {
                            this.setState({ pS: true })
                        } else {
                            this.setState({ pnmS: true })
                        }
                    }
                }
            })
            .catch(err => console.log(err))
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
                <Form className='attached fluid segment'>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First Name' placeholder='First Name' type='text' name='first_name' onChange={this.handleChange}/>
                        <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' name='last_name' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Password' type='password' name='password' onChange={this.handleChange}/>
                        <Form.Input fluid label='Enter youy Password again' type='password' name='password2' onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Input label='Email' placeholder='Email' type='text' name='email' onChange={this.handleChange}/>
                    <Form.Button color='blue' content='Submit' onClick={this.handleClick}/>
                </Form>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already signed up?<Link className='myLink' to='/login'> Login Here </Link>instead.
            </Message>
                <Message
                    hidden={!this.state.emailS}
                    negative
                    content='Email is required'
                />
                <Message
                    hidden={!this.state.emailnS}
                    negative
                    content='Email is not valid'
                />
                <Message
                    hidden={!this.state.fnS}
                    negative
                    content='First Name is required'
                />
                <Message
                    hidden={!this.state.lnS}
                    negative
                    content='Last Name is required'
                />
                <Message
                    hidden={!this.state.pS}
                    negative
                    content='Password is required'
                />
                <Message
                    hidden={!this.state.pnmS}
                    negative
                    content='Passwords did not match'
                />
                <Message
                    hidden={!this.state.check}
                    positive
                    content='You have been succesfully registered, Go to Sign in to start'
                />
            </div>
        )
    }
}

export { Register }