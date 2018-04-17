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
  serialize = (form) =>{
    let arr = []
    for(let i of form){
      let a = i[0]+'='+encodeURIComponent(i[1])
      arr.push(a)
    }
    return arr.join('&').replace(/%20/g,'+')
  }

  loginUser = async () =>{
    let headers = new Headers()
    headers.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
    headers.set('Content-Type','application/x-www-form-urlencoded')
    let formData = new FormData()
    formData.append('email',this.state.email)
    formData.append('password',this.state.pass)
    fetch('/login',{
      method: 'post',
      headers,
      body: this.serialize(formData)
    })
    .then(res => {
    return  res.json()
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
              <Form.Button color='blue' content='Log in'/>
            </Form>
          </div>        
        )
    }
}

export {Login}