import React, {Component} from 'react'
import {Message, Button, Form, Icon} from 'semantic-ui-react'
class Login extends Component {
    state = {
      name : '',
      sname: ''
    }

    handleSubmit = ()  => {
      const {name} = this.state
      this.setState({sname:name})
    }

    handleChange = (e,{name,value}) => {
      this.setState({ name: value })
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
            <Form onSubmit={this.handleSubmit} className='attached fluid segment'>
              <Form.Group widths='equal'>
                <Form.Input fluid label='First Name' placeholder='First Name' type='text' value={name} name='name' onChange={this.handleChange}/>
                <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' />
              </Form.Group>
              <Form.Input label='Username' placeholder='Username' type='text' />
              <Form.Input label='Password' type='password' />
              <Form.Checkbox inline label='I agree to the terms and conditions' />
              <Form.Button color='blue' content='Submit' />
            </Form>
            <Message attached='bottom' warning>
              <Icon name='help' />
              Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
            </Message>
            <strong>onChange:</strong>
        <pre>{JSON.stringify({ name}, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ sname }, null, 2)}</pre>
          </div>        
        )
    }
}

export {Login}