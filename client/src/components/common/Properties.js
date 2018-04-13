import React, {Component} from 'react'
import { Segment, Accordion, Form, Card, Divider } from 'semantic-ui-react'

class Properties extends Component {
constructor(props){
    super(props)
    this.state = {
        vehicles : [],
        lands : []
    }
}
    componentWillMount(){
        this.callRequest()
        .then(res => {
            if (res.status == 401){
                console.log('bad')
            }else{
                this.setState({ vehicles: res.properties.vehicles })
                this.setState({ lands: res.properties.lands })
            }
            
        })
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/properties', {
            credentials : 'include'
        })
        if (response.status == 401){
            return response
        }else {
            const body = await response.json()
            return body
        }
        
        
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

        const formRH = (
            <div>
                <Form.Input label='Identifier Name' placeholder='name' name='name' />
                <Form.Input type='number' label='Property Valuation' placeholder='Property Valuation' name='valuation' step='0.01'/>
                <Form.Checkbox name='bill' label='Do you receive digital bill?'/>
                <Form.Button color='grey' content='Add' />
            </div>
        )

        let cardC = this.state.vehicles.map( (vehicles) =>
            <Card 
            header = {vehicles.line}
            meta = {vehicles.brand}
            description = {'Cilindraje : ' + vehicles.cilinder}
            />
        )

        let cardL = this.state.lands.map( (lands) => 
            <Card
            header = {lands.name}
            meta = {(lands.bill) ? 'Receive digital bill ': 'Don´t receive digital bill'}
            description = {'Property valuation : ' + lands.value}
            />
        )
            
        let viewCars = (
            <Card.Group>
                {cardC}
            </Card.Group>
        )

        let viewLand = (
            <Card.Group>
                {cardL}
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
                title: 'Add new Residential Housing',
                content: { content: formRH, key: 'content' }
            }
        ]

        const cardsCar = [
            {
                title : 'View your vehicles',
                content : { content : viewCars ,key: 'content'}
            }
        ]

        const cardsLand = [
            {
                title: 'View your properties',
                content: { content: viewLand, key: 'content' }
            }
        ]

        return(
            <div className='myContainer--small'>
                <Segment>
                    <Form action='/add/car' method='post'>
                        <Accordion as={Form.Field} panels={panelsCar}/>
                    </Form>
                        <Divider/>
                        <Accordion panels={cardsCar}/>
                </Segment>
                <Divider hidden />
                <Segment>
                    <Form action='/add/land' method='post'>
                        <Accordion as={Form.Field} panels={panelsLand} />
                    </Form>
                    <Divider />
                    <Accordion panels={cardsLand} />
                </Segment>
            </div>
        )
    }
}

export {Properties}