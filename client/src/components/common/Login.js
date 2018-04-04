import React, {Component} from 'react'
import {Message, Form} from 'semantic-ui-react'

class Login extends Component {
    render (){
        return(
            <div className='myContainer'>
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form below to sign-up for a new account'
            />
            <Form action='/login' className='attached fluid segment' method='post'>
              <Form.Input label='Email' placeholder='Email' type='text' name='email'/>    
              <Form.Input label='Password' type='password' name='password' />              
              <Form.Button color='blue' content='Log in' />
            </Form>
          </div>        
        )
    }
}

export {Login}