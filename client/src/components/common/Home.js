import React, {Component} from 'react'
import {Container, Grid, Image, Statistic, Divider} from 'semantic-ui-react'
import img_home from './images/dineroBitch.jpg'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            members : 0
        }
    }

    componentWillMount(){
        fetch('/members')
        .then( res => res.json())
        .then( res => this.setState({members : res.count}))
        .catch( err => console.log(err))
    }

    render (){
        return(
            <div className='full'>
            <Container>
                <Grid columns={2} padded>
                    <Grid.Column>
                        <Image size='medium' centered circular src={img_home}/>
                    </Grid.Column>
                    <Grid.Column>
                            <h1 className='title-home' >
                                Manage your finances and have control of your tax information in one place
                            </h1>
                    </Grid.Column>
                </Grid>
                </Container>
                <Divider hidden/>
                <div className='stadistic'>
                <div className='myContainer'>
                    <Statistic.Group widths='two'>
                        <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label>Views</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{this.state.members}</Statistic.Value>
                            <Statistic.Label>Members</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </div>
                </div>
            </div>
        )
    }
}

export {Home}