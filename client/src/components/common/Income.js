import React, {Component} from 'react'
import {Header, Item, Card, Button, Grid, Form, Menu, Popup} from 'semantic-ui-react'

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
            <Item header={item.value} description={item.description} meta={item.date.toDateString()} />
        ) 
    }

    render(){

        let info = this.state.incomes.map( (income) =>
            <Card fluid header={income.name} content={this.getinfoItem(income)}/>
        )

        let form = this.state.incomes.map((income) =>
            <option value={income.name}>{income.name}</option>    
        )

        return(
            <div className='myContainer'>
                <Header as='h3' content='Incomes' color='green'/>
                {info}
                <Popup trigger={<Button circular color='blue' floated='right' icon='add circle' />} flowing position='left center' hoverable>
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