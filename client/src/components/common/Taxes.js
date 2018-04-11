import React, {Component} from 'react'
import {Item, List, Button} from 'semantic-ui-react'
import auto from './images/auto.png'
import casa from './images/casa.jpg'
import money from './images/money.jpeg'

class Taxes extends Component{

    render() {
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
                                        Lena
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