import React, {Component} from 'react'
import {Item, List, Button, Card, Icon} from 'semantic-ui-react'
import auto from './images/auto.png'
import casa from './images/casa.jpg'
import money from './images/money.jpeg'

class Taxes extends Component{
    constructor(props) {
        super(props)
        this.state = {
            lands: [],
            vehicles : []
        }
    }

    componentWillMount(){
        this.callRequest()
        .then( res => { 
            this.setState({ lands : res.properties.lands })
            this.setState({ vehicles : res.properties.vehicles })
        })
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/properties', {
            credentials : 'include'
        })
        const body = await response.json()
        return body
    }  

    render() {

        let valueLand = this.state.lands.map( (land) =>
            <Card>
                <Card.Content>
                    <Card.Header>{land.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <List>
                        <List.Item>
                            <Icon name='right triangle' />
                            {(land.bill) ? 'if you pay before  4 may you have to pay : '+ land.cost*0.89 : 'if you pay before  4 may you have to pay :  ' + land.cost*0.90}
                        </List.Item>
                        <List.Item>
                            <Icon name='help' />
                            {(land.bill) ? 'if you pay after 4 may you have to pay : ' + land.cost*0.99  : 'if you pay after  4 may you have to pay :  ' + land.cost}
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        )

        return(
            <Item.Group centered className='myContainer--right'>
                <Item>
                    <Item.Image size='small' src={auto} />
                    <Item.Content>
                        <Item.Header>Vehicle Tax</Item.Header>
                        <Item.Description>
                            <List divided animated verticalAlign='middle'>
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button>Add</Button>
                                    </List.Content>
                                    <List.Content>
                                        {valueLand}
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button>Add</Button>
                                    </List.Content>
                                    <List.Content>
                                        Lindsay
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Image size='small' src={casa} />
                    <Item.Content>
                        <Item.Header>Property Tax</Item.Header>
                        <Item.Description content='HI' />
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Image size='small' src={money} />
                    <Item.Content header='Income tax' description='hi' />
                </Item>
            </Item.Group>
        )
    }
}

export {Taxes}