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
        alert(' The day is : ' + value.toDateString())
    }

    dateProBef = () => this.setState({ value: new Date("April 6, 2018")})
    dateProAft = () => this.setState({ value: new Date("June 15, 2018") })
    dateVeBef = () => this.setState({ value: new Date("May 4, 2018") })
    dateVeAft = () => this.setState({ value: new Date("June 22, 2018") })

    render(){
        const {value} = this.state
        
        return(
            <Grid centered className='main--content space-bottom'>
                <Grid.Column width={7} floated='right'>
                    <Header as='h2' color='orange'>Important Dates</Header>
                    <Card centered>
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
                                        date='Pay with discount'
                                        summary="6 April 2018"
                                    />
                                    <Button basic color='blue' onClick={this.dateProBef}>View on calendar</Button>
                                    <Divider />
                                    <Feed.Event
                                        icon='thumbs down'
                                        date='Pay without discount'
                                        summary="15 Jun 2018"
                                    />
                                    <Button basic color='blue' onClick={this.dateProAft}>View on calendar</Button>
                                </Feed>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button basic color='green' content={<a target="_blank" className='myLink' rel='noopener noreferrer' href='https://oficinavirtual.shd.gov.co/Tareaps/TaxPayment.jsp'>Pay</a>} />
                        </Card.Content>
                    </Card>
                    <Card centered>
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
                                        date='Pay with discount'
                                        summary="4 May 2018"
                                    />
                                        <Button basic color='blue' onClick={this.dateVeBef}>View on calendar</Button>
                                    <Divider/>
                                    <Feed.Event
                                        icon='thumbs down'
                                        date='Pay without discount'
                                        summary="22 Jun 2018"
                                    />
                                        <Button basic color='blue' onClick={this.dateVeAft}>View on calendar</Button>
                                </Feed>
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <Button basic color='green' content={<a target="_blank" className='myLink' rel='noopener noreferrer' href='https://oficinavirtual.shd.gov.co/Tareaps/TaxPayment.jsp'>Pay</a>}/>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={6} floated='left'>
                    <Header as='h4' color='orange'>Check This!</Header>
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