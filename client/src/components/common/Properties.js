import React, {Component} from 'react'
import { Segment, Accordion, Form, Card, Divider } from 'semantic-ui-react'

class Properties extends Component {
constructor(props){
    super(props)
    this.state = {
        properties : []
    }
}
    componentWillMount(){
        this.callRequest()
        .then(res => this.setState({properties : res.properties}))
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/properties', {
            credentials : 'include'
        })
        const body = response.json()
        return body
    }

    render(){

        const formCar = (
            <div>
                <Form.Group unstackable widths={2}>
                    <div className='field'>
                        <label>Type of vehicle</label>
                        <select className='ui selection dropdown' name='kind'>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Ford" >Ford</option>
                            <option value="Honda">Honda</option>
                            <option value="Hyundai" >Hyundai</option>
                            <option value="Kia" >Kia</option>
                            <option value="Mazda" >Mazda</option>
                            <option value="Nissan" >Nissan</option>
                        </select>                        
                    </div>
                    <div className='field'>
                        <label>Brand of Vehicle</label>
                        <select name='brand' className='ui selection dropdown'>
                            <option value="Automovil">AutoMóvil</option>
                            <option value="Camioneta">Camioneta</option>
                            <option value="Doblecabina">Doblecabina</option>
                            <option value="Electrico">Electríco o Híbrido</option>
                            <option value="Motocicleta">Motocicleta</option>
                        </select>
                    </div>   
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input label='Line' placeholder='Line' name='line'/>
                    <Form.Input label='Engine' placeholder='Engine' name='engine'/>
                </Form.Group>
                <Form.Button color='grey' content='Add'/>
            </div>
        )

        let cards = this.state.properties.map( (vehicles) =>
            <Card 
            header = {vehicles.line}
            meta = {vehicles.brand}
            description = {'Cilindraje : ' + vehicles.cilinder}
            />
        )
            
        let view = (
                <Card.Group>
                    {cards}
                </Card.Group>
        )

        const panelsCar = [
            {
                title: 'Add new Vehicle',
                content : {content : formCar, key: 'content'}
            }
        ]

        const panelsLand = [
            {
                title: 'Add new Land',
                content: { content: formCar, key: 'content' }
            }
        ]

        const panelItem = [
            {
                title : 'View your properties',
                content : { content : view ,key: 'content'}
            }
        ]

        return(
            <div className='myContainer--small'>
                <Segment>
                    <Form action='/add/car' method='post'>
                        <Accordion as={Form.Field} panels={panelsCar}/>
                    </Form>
                        <Divider/>
                        <Accordion panels={panelItem}/>
                </Segment>
                <Divider hidden />
                <Segment>
                    <Form action='/add/land' method='post'>
                        <Accordion as={Form.Field} panels={panelsLand} />
                    </Form>
                    <Divider />
                    <Accordion panels={panelItem} />
                </Segment>
            </div>
        )
    }
}

export {Properties}