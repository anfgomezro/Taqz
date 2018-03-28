import React, {Component} from 'react'
import {Divider, Grid, Container, List, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Footer extends Component{
    constructor(props) {
        super(props);
    }

    render (){
        return( 
            <div className='footer full'>
            <Container>
                <Grid columns={2} padded>
                    <Grid.Column>
                    <List link>
                        <List.Item active>Taqz</List.Item>
                        <List.Item >Why taqz?</List.Item>
                        <List.Item >FAQ</List.Item>
                        <List.Item >hi</List.Item>
                    </List>
                    </Grid.Column>
                    <List link>
                        <List.Item active>About Taqz</List.Item>
                        <List.Item >
                            <Link to='/about'>About</Link>
                        </List.Item>
                        <List.Item >Contact</List.Item>
                        <List.Item >Team</List.Item>
                    </List>
                    <Grid.Column>
                    </Grid.Column>
                </Grid>
                <Divider section />
                <Segment basic>
                    <p> Copyright (c) 2018  All Rights Reserved. </p>                                                        
                </Segment>
            </Container>
            </div>
        )
    }
}

export {Footer}