import React, {Component} from 'react'
import Calendar from 'react-calendar'
import { Grid, Header, Card, Button, Feed, Divider } from 'semantic-ui-react'

class CalendarTax extends Component{
    constructor(props){
        super(props)
        this.state = {
            value : new Date()
        }
    }

    onChange = value => this.setState({value})

    handleClickDay = (value) => {
        alert('day is : ' + value)
    }

    render(){
        const {value} = this.state
        
        return(
            <Grid centered className='main--content space-bottom'>
                <Grid.Column width={5}>
                    <Header as='h3' color='orange'>Important Dates</Header>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Property Tax
                        </Card.Header>
                            <Card.Meta>
                                important
                            </Card.Meta>
                            <Divider />
                            <Card.Description>
                                <Feed>
                                    <Feed.Event
                                        icon='thumbs up'
                                        date='6 April'
                                        summary="Pay with discount"
                                    />
                                    <Button basic color='blue'>View on calendar</Button>
                                    <Divider />
                                    <Feed.Event
                                        icon='thumbs down'
                                        date='15 Jun'
                                        summary="Pay without discount"
                                    />
                                    <Button basic color='blue'>View on calendar</Button>
                                </Feed>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button basic fluid color='green'>Pay</Button>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Vehicle Tax
                            </Card.Header>
                            <Card.Meta>
                                important
                             </Card.Meta>
                                <Divider />
                            <Card.Description>
                                <Feed>
                                    <Feed.Event
                                        icon='thumbs up'
                                        date='4 May'
                                        summary="Pay with discount"
                                    />
                                        <Button basic color='blue'>View on calendar</Button>
                                    <Divider/>
                                    <Feed.Event
                                        icon='thumbs down'
                                        date='22 Jun'
                                        summary="Pay without discount"
                                    />
                                        <Button basic color='blue'>View on calendar</Button>
                                </Feed>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button basic fluid color='green'>Pay</Button>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Calendar className='myContainer sticky' 
                            onChange={this.onChange}
                            showWeekNumbers
                            value={value}
                            onClickDay={this.handleClickDay}
                        />
                    </Grid.Column>
            </Grid>
        )
    }
}

export {CalendarTax}