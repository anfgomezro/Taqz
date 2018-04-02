import React, {Component} from 'react'
import {Message, Form, Icon} from 'semantic-ui-react'
class Login extends Component {
    state = {
      name : '',
      sname: ''
    }

    render (){

      const {name,sname} = this.state

        return(
            <div className='myContainer'>
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form below to sign-up for a new account'
            />
            <Form onSubmit={this.handleSubmit} action='/login' className='attached fluid segment' method='post'>
              <Form.Group widths='equal'>
                <Form.Input fluid label='First Name' placeholder='First Name' type='text'  name='first_name'/>
                <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' name='last_name'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Password' type='password' name='password'/>
                <Form.Input fluid label='Enter youy Password again' type='password' name='password2'/>
              </Form.Group>
              <Form.Input label='Email' placeholder='Email' type='text' name='email'/>              
              <Form.Checkbox inline label='I agree to the terms and conditions' />
              <Form.Button color='blue' content='Submit' />
            </Form>
            <Message attached='bottom' warning>
              <Icon name='help' />
              Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
            </Message>
          </div>        
        )
    }
}

export {Login}