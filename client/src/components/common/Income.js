import React, {Component} from 'react'
import {Header, Feed, Card, Button, Form, Popup, Grid, Message} from 'semantic-ui-react'

class Income extends Component {
    constructor(props){
        super(props)
        this.state = {
            incomes : [], 
            status : false
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

    serialize = (form) => {
        let arr = []
        for (let i of form) {
            let a = i[0] + '=' + encodeURIComponent(i[1])
            arr.push(a)
        }
        return arr.join('&').replace(/%20/g, '+')
    }

    remove = (e, { id, idt }) => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('id', id)
        form.append('idt', idt)
        fetch('/remove/income', {
            credentials: 'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ status: res.status })
                this.setState({ incomes: res.incomes })
            })
            .catch(err => console.log(err))
    }

    getinfoItem = (income) => {
        return income.items.map( (item) =>
            <Grid>
                <Grid.Column width={5}>
                    <Feed>
                        <Feed.Event icon='dollar' date={(new Date(item.date)).toDateString()} summary={item.description + ' : ' + item.value} />
                    </Feed>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button id={item._id} idt={income._id} size='mini' content='Remove' icon='remove' color='red' onClick={this.remove} />
                </Grid.Column>
            </Grid>
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
                    {this.getinfoItem(income)}
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
                <Message
                    hidden={!this.state.status}
                    positive
                    content='Your heve delete one element'
                />
            </div>
        )
    }
}

export {Income}