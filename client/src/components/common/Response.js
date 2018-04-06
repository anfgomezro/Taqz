import React, {Component} from 'react'
import {Progress, Message, Header, Icon} from 'semantic-ui-react'

class Response extends Component {

    state = {
        response: '',
        cont: '',
        porcent : 0
    }

    componentDidMount() {
        this.callApi()
          .then(res => {
              this.setState({ response: res.express })
              this.setState({ cont : res.cont })
              this.setState({ porcent : res.porcent })
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
            <div className='myContainer main'>                
                <Header>Build in progress</Header>
                    <Progress percent={this.state.porcent} progress />
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