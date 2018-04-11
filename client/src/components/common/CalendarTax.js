import React, {Component} from 'react'
import Calendar from 'react-calendar'
import {Grid, Header, Card, Button} from 'semantic-ui-react'

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
                <Grid.Row>
                    <Grid.Column width={5}>
                    <Header as='h3' color='orange'>Important Dates</Header>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Land Tax
                            </Card.Header>
                            <Card.Meta>
                                important
                            </Card.Meta>
                            <Card.Description>
                                The deadline is <strong>4 may</strong> 
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>Pay</Button>
                                    <Button basic color='blue'>View on calendar</Button>
                                </div>
                            </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                Land Tax
                            </Card.Header>
                            <Card.Meta>
                                important
                             </Card.Meta>
                            <Card.Description>
                                The deadline is <strong>4 may</strong>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>Pay</Button>
                                <Button basic color='blue'>View on calendar</Button>
                            </div>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Calendar className='myContainer'
                            onChange={this.onChange}
                            showWeekNumbers
                            value={value}
                            onClickDay={this.handleClickDay}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export {CalendarTax}