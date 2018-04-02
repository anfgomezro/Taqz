import React, {Component} from 'react'
import {Progress, Message, Header, Icon} from 'semantic-ui-react'

class Response extends Component {

    state = {
        response: '',
        cont: ''
    }

    componentDidMount() {
        this.callApi()
          .then(res => {
              this.setState({ response: res.express })
              this.setState({cont : res.cont})
            })
          .catch(err => console.log(err));
      }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };

    render (){
        return(
            <div className='myContainer'>                
                <Header>Build in progress</Header>
                    <Progress percent={10} progress />
                <Message icon>
                    <Icon name='circle notched' loading />
                    <Message.Content>
                    <Message.Header>{this.state.response}</Message.Header>
                        {this.state.cont}       
                    </Message.Content>
                </Message>
                </div>
                
        )
    }
}

export {Response}