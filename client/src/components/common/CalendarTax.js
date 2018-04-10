import React, {Component} from 'react'
import Calendar from 'react-calendar'

class CalendarTax extends Component{
    constructor(props){
        super(props)
        this.state = {
            value : new Date()
        }
    }

    onChange = value => this.setState({value})

    render(){
        const {value} = this.state
        
        return(
            <Calendar className='myContainer'
                onChange={this.onChange}
                showWeekNumbers
                value={value}
            />
        )
    }
}

export {CalendarTax}