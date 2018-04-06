import React, {Component} from 'react'
import {Grid, Image } from 'semantic-ui-react'
import img_and from './images/and.jpg'

class About extends Component {

    render (){
        return(
                <div className='myContainer'>
                 <Grid columns={2} padded >
                    <Grid.Column>
                        <Image floated='left' circular size='small' src={img_and}/>
                        <h1>Head of EveryThing</h1>
                    </Grid.Column>
                    <Grid.Column >
                        <Image floated='left' circular size='small' src={img_and}/>
                        <h1>Manage your taxes</h1>                        
                    </Grid.Column>
                </Grid>
                </div>
        )
    }
}

export {About}