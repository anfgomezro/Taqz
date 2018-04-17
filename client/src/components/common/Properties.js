import React, {Component} from 'react'
import { Segment, Accordion, Form, Card, Divider, Button, Popup, Message} from 'semantic-ui-react'

class Properties extends Component {
constructor(props){
    super(props)
    this.state = {
        vehicles : [],
        lands : [], 
        value : 0,
        check : '',
        name : '', 
        status : false
    }
}
    componentWillMount(){
        this.callRequest()
        .then(res => {
                this.setState({ vehicles: res.properties.vehicles })
                this.setState({ lands: res.properties.lands })
        })
        .catch(err => console.log(err))
    }

    callRequest = async () => {
        const response = await fetch('/usr/properties', {
            credentials : 'include'
        })
            const body = await response.json()
            return body
    }

    serialize = (form) => {
        let arr = []
        for (let i of form) {
            let a = i[0] + '=' + encodeURIComponent(i[1])
            arr.push(a)
        }
        return arr.join('&').replace(/%20/g, '+')
    }

    editLand = async () =>{
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('name',this.state.name)
        form.append('valuation', this.state.value)
        form.append('bill',this.state.check)
        form.append('id',)
        fetch('/edit/land',{
            method: 'post',
            headers,
            body: this.serialize(form)
        })
        .then(res =>{
            return res.json()
        })
        .then(res => this.setState({statusUpdate : res.status}))
        .catch(err => console.log(err))
    }

    changeCheck = (event) => this.setState({check : event.target.value})
    changeName = (event) => this.setState({ name: event.target.value })
    changeValue = (event) => this.setState({ value: event.target.value })

    removeLand = (e,{id}) => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('id', id)
        fetch('/remove/land', {
            credentials:'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ status: res.status })
                this.setState({ lands: res.lands})
            })
            .catch(err => console.log(err))
    }

    removeVehicle = (e, { id }) => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('id', id)
        fetch('/remove/vehicle', {
            credentials: 'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ status: res.status })
                this.setState({ vehicles : res.vehicles})
            })
            .catch(err => console.log(err))
    }

    render(){

        const formLand = (
            <div>
                <Form.Input label='Identifier Name' placeholder='Name' name='name' value={this.state.name} onChange={this.changeName}/>
                <Form.Input type='number' label='Property Valuation' placeholder='Property Valuation' name='valuation' value={this.state.value} onChange={this.changeValue} />
                <Form.Checkbox name='bill' label='Do you receive digital bill?' value={this.state.check} onChange={this.changeCheck}/>
                <Form.Button color='purple' content='Add' onClick={this.editLand}/>
            </div>
        )

        let editLand = (
            <Popup trigger={<Button compact content='Edit' icon='setting' color='blue'/>} flowing position='right center' hoverable>
                <Form>
                    {formLand}
                </Form>
            </Popup>
        )

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

        let cardC = this.state.vehicles.map( (vehicles) =>
            <Card 
            header = {vehicles.line}
            meta = {vehicles.brand}
            description = {'Cilindraje : ' + vehicles.cilinder}
            extra = {<Button id={vehicles._id} content='Remove' icon='setting' color='red' onClick={this.removeVehicle} />}
            />
        )

        let cardL = this.state.lands.map( (lands) => 
            <Card
            header = {lands.name}
            meta = {(lands.bill) ? 'Receive digital bill ': 'Don´t receive digital bill'}
            description = {'Property valuation : ' + lands.value}
            extra={<Button id={lands._id} content='Remove' icon='setting' color='red' onClick={this.removeLand} />}
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
                content: { content: formLand, key: 'content' }
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
                    <Accordion panels={cardsLand}/>
                </Segment>
                <Message
                    hidden={!this.state.status}
                    positive
                    content='Your heve delete one element'
                />
            </div>
        )
    }
}

export {Properties}