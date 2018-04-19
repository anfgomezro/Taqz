import React, {Component} from 'react'
import {Item, List,Card, Icon, Divider} from 'semantic-ui-react'
import auto from './images/auto.png'
import casa from './images/casa.jpg'


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
        console.log(response)
        const body = await response.json()
        return body
    }  

    render() {

        let valueLand = this.state.lands.map( (land) =>
            <List.Item>
                <List.Content>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{land.name}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <List>
                                <List.Item>
                                    <Icon name='smile' color='green' />
                                    {(land.bill) ? 'If you pay before  4 may you have to pay : ' + land.cost * 0.89 + ' $' : 'if you pay before  6 April you have to pay :  ' + land.cost * 0.90 + ' $'}
                                </List.Item>
                                <List.Item>
                                    <Icon name='frown' color='red'/>
                                    {(land.bill) ? 'If you pay after 4 may you have to pay : ' + land.cost * 0.99+ ' $' : 'if you pay after  6 April you have to pay :  ' + land.cost + ' $'}
                                </List.Item>
                            </List>
                        </Card.Content>
                    </Card>
                </List.Content>
            </List.Item>
        )

        let valueVehicle = this.state.vehicles.map ( (vehicle) =>
            <List.Item>
                <List.Content>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{vehicle.line}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <List>
                                <List.Item>
                                    <Icon name='car' color='green' />
                                    {' If you pay before 4 may you have to pay '+vehicle.cost*0.9+' $'}
                                </List.Item>
                                <List.Item>
                                    <Icon name='car' color='red' />
                                    {' If you pay after 4 may you have to pay ' + vehicle.cost+ ' $'}
                                </List.Item>
                            </List>
                        </Card.Content>
                    </Card>
                </List.Content>
            </List.Item>
    )

        return(
            <Item.Group className='myContainer--right'>
                <Item>
                    <Item.Image size='small' src={auto} />
                    <Item.Content>
                        <Item.Header>Vehicle Tax</Item.Header>
                        <Item.Description>
                            <List divided animated verticalAlign='middle'>
                                {valueVehicle}
                            </List>
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Divider/>
                <Item>
                    <Item.Image size='small' src={casa} />
                    <Item.Content>
                        <Item.Header>Property Tax</Item.Header>
                        <Item.Description>
                            <List divided animated verticalAlign='middle'>
                                {valueLand}
                            </List>
                        </Item.Description>
                    </Item.Content>
                </Item>
                <Divider hidden/>
            </Item.Group>
        )
    }
}

export {Taxes}