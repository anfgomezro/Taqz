import React, {Component} from 'react'
import Select, { Segment, Accordion, Form } from 'semantic-ui-react'

class Properties extends Component {

    render(){

        const formCar = (
            <div>
                <Form.Group unstackable widths={2}>
                    <div className='field'>
                        <label>Type of vehicle</label>
                        <select className='ui selection dropdown'>
                            <option value="chevrolet">Chevrolet</option>
                            <option value="ford" >Ford</option>
                            <option value="honda" className='damit'>Honda</option>
                            <option value="Hyundai" >Hyundai</option>
                            <option value="kia" >Kia</option>
                            <option value="mazda" >Mazda</option>
                            <option value="nissan" >Nissan</option>
                        </select>                        
                    </div>
                    <div className='field'>
                        <label>Brand of Vehicle</label>
                        <select name='brand' className='ui selection dropdown'>
                            <option value="automovil">AutoMóvil</option>
                            <option value="camioneta">Camioneta</option>
                            <option value="doblecabina">Doblecabina</option>
                            <option value="electrico">Electríco o Híbrido</option>
                            <option value="motocicleta">Motocicleta</option>
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

        const panels = [
            {
                title: 'Add new Vehicle',
                content : {content : formCar, key: 'content'}
            }
        ]

        return(
            <div className='main--content'>
                <Segment>
                    <Form action='/add/car' method='post'>
                        <Accordion as={Form.Field} panels={panels}/>
                    </Form>
                </Segment>
            </div>
        )
    }
}

export {Properties}