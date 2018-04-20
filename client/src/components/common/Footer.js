import React, {Component} from 'react'
import {Divider, Grid, Container, List, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Footer extends Component{
    render (){
        return( 
            <div className='footer full'>
            <Container>
                <Grid columns={2} padded>
                    <Grid.Column>
                        <List link >
                            <List.Item active className='letter-footer'>Taqz</List.Item>
                            <List.Item className='letter-footer'>Why taqz?</List.Item>
                            <List.Item className='letter-footer'>FAQ</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <List link >
                            <List.Item className='letter-footer' active>About Taqz</List.Item>
                            <List.Item >
                                <Link className='letter-footer' to='/about'>About</Link>
                        </List.Item>
                            <List.Item className='letter-footer'>Contact</List.Item>
                            <List.Item className='letter-footer'>Team</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                <Divider section />
                <Segment basic>
                    <p className='letter-footer'> Copyright (c) 2018  All Rights Reserved. </p>                                                        
                </Segment>
            </Container>
            </div>
        )
    }
}

export {Footer}