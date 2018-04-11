import React, {Component} from 'react'
import {Message, Form} from 'semantic-ui-react'

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
    email : '',
    pass : ''
  }
}


  loginUser = async () =>{
    let headers = new Headers()
    headers.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    let formData = new FormData()
    formData.append('email',this.state.email)
    formData.append('password',this.state.pass)
    const response = await fetch('/login',{
      method: 'post',
      headers,
      body : formData
    })
    const body = await response.json()
    sessionStorage.setItem('token',body.token)
  }

  handleChangeEmail = (event) => {
      this.setState({ email : event.target.value })
  }

  handleChangePass = (event) => {
    this.setState({ pass: event.target.value })
  }

    render (){
        return(
            <div className='myContainer--tiny'>
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form below to sign-up for a new account'
            />
            <Form action='/login' method='post' className='attached fluid segment'>
              <Form.Input label='Email' placeholder='Email' type='text' name='email' value={this.state.email} onChange={this.handleChangeEmail}/>    
              <Form.Input label='Password' type='password' name='password' value={this.state.pass} onChange={this.handleChangePass}/>              
              <Form.Button color='blue' content='Log in' />
            </Form>
          </div>        
        )
    }
}

export {Login}