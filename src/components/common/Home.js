import React, {Component} from 'react'
import {Container, Grid, Image, Statistic, Divider} from 'semantic-ui-react'
import img_home from './images/img_home.jpg'

class Home extends Component {
    constructor(props){
        super(props)
    }

    render (){
        return(
            <div className='full'>
            <Container>
                <Grid columns={2} padded>
                    <Grid.Column>
                        <Image circular src={img_home}/>
                    </Grid.Column>
                    <Grid.Column>
                        <h1>Manage your taxes</h1>
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
                            <Statistic.Value>0</Statistic.Value>
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