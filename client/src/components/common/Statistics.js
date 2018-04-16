import React, {Component} from 'react'
import {Pie} from 'react-chartjs-2'
import {Grid, Header} from 'semantic-ui-react'
import randomColor from 'randomcolor'

class Statistics extends Component{
    constructor(props){
        super(props)
        this.state = {
            incomes : [],
            expenses: []
        }
    }

    componentWillMount(){
        this.callRequest()
        .then(res => {
            this.setState({ incomes : res.incomes})
            this.setState({ expenses : res.expenses})
        })
        .catch( err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/money',{
            credentials : 'include'
        })
        const body = await response.json()
        return body
    }

    getSum = (items) => {
        let sum = 0
        for(let j of items){
            sum = sum + j.value
        }
        return sum
    }

    fillData = (entry) => {
        let labels = []
        let data = []
        let backgroundColor = []
        let hoverBackgroundColor = []
        for( let i of entry){
            labels.push(i.name)
            let color = randomColor()
            backgroundColor.push(color)
            hoverBackgroundColor.push(color)
            data.push(this.getSum(i.items))
            console.log(data)
        }
        return { labels,
            datasets: [{
                data,
                backgroundColor,
                hoverBackgroundColor
            }]
        }
    }
    

    render(){

        const {incomes, expenses} = this.state

        const dataIncome = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [12],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        }

        const dataExpense = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        }

        return(
            <Grid columns={2} padded>
                <Grid.Column>
                    <Header as='h2' content='Incomes statistics'/>
                    <Pie data={this.fillData(incomes)}/>
                </Grid.Column>
                <Grid.Column>
                    <Header as='h2' content='Expenses statistics'/>                    
                    <Pie data={this.fillData(expenses)}/>
                </Grid.Column>
            </Grid>
        )
    }
}

export { Statistics }