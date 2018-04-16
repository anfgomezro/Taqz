import React, { Component } from 'react'
import { Header, Item, Card, Button,Popup, Form, Feed} from 'semantic-ui-react'

class Expense extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenses : []
        }
    }

    componentWillMount() {
        this.callRequest()
            .then(res => this.setState({ expenses : res.expenses }))
            .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/expenses', {
            credentials: 'include'
        })
        const body = await response.json()
        return body
    }

    getinfoItem = (expense) => {
        return expense.items.map((item) =>
            <Feed.Event icon='currency' date={(new Date(item.date)).toDateString()} summary={item.description + ' : ' + item.value} />            
        )
    }

    render() {

        let info = this.state.expenses.map((expense) =>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {expense.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {this.getinfoItem(expense)}
                    </Feed>
                </Card.Content>
            </Card>
        )

        let form = this.state.expenses.map((expense) =>
            <option value={expense.name}>{expense.name}</option>
        )

        return (
            <div className='myContainer'>
                <Header as='h3' content='Expenses' color='red' />
                {info}
                <Popup trigger={<Button circular color='blue' floated='right' icon='add' />} flowing position='left center' hoverable>
                    <Form action='/add/expense' method='post'>
                        <div className='field'>
                            <label>Type of Expense</label>
                            <select className='ui selection dropdown' name='type'>
                                {form}
                            </select>
                        </div>
                        <Form.Input  label='Description' placeholder='Description' name='description'/>
                        <Form.Input  label='Value' type='number' placeholder='Value' name='value'/>
                        <Form.Button color='purple' content='Submit'/>
                    </Form>
                </Popup>
            </div>
        )
    }
}

export { Expense }