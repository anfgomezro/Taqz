import React, {Component} from 'react'

class Not extends Component{
    constructor(props){
        super(props)
        this.state = {
            msg : ''
        }
    }

    render(){
        return(
            <p>Hello World</p>
        )
    }
}

export { Not }