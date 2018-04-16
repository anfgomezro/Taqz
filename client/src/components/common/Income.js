import React, {Component} from 'react'
import {Header, Feed, Card, Button, Form, Popup} from 'semantic-ui-react'

class Income extends Component {
    constructor(props){
        super(props)
        this.state = {
            incomes : []
        }
    }

    componentWillMount(){
        this.callRequest()
        .then(res => this.setState({incomes : res.incomes}))
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/incomes', {
            credentials : 'include'
        })
        const body = await response.json()
        return body
    }

    getinfoItem = (income) => {
        return income.items.map( (item) =>
            <Feed.Event icon='dollar' date={(new Date(item.date)).toDateString()} summary={item.description + ' : ' + item.value} />
        ) 
    }

    render(){

        let info = this.state.incomes.map( (income) =>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {income.name}
                    </Card.Header>          
                </Card.Content>
                <Card.Content>
                    <Feed>
                    {this.getinfoItem(income)}
                    </Feed>
                </Card.Content>
            </Card>
        )

        let form = this.state.incomes.map((income) =>
            <option value={income.name}>{income.name}</option>    
        )

        return(
            <div className='myContainer'>
                <Header as='h3' content='Incomes' color='green'/>
                {info}
                <Popup trigger={<Button circular color='blue' floated='right' icon='add' />} flowing position='left center' hoverable>
                    <Form action='/add/income' method='post'>
                        <div className='field'>
                            <label>Type of Income</label>
                            <select className='ui selection dropdown' name='type'>
                                {form}
                            </select>
                        </div>
                        <Form.Input label='Description' placeholder='Description' name='description' />
                        <Form.Input label='Value' type='number' placeholder='Value' name='value' />
                        <Form.Button color='purple' content='Submit' />
                    </Form>
                </Popup>
            </div>
        )
    }
}

export {Income}