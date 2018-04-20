import React, {Component} from 'react'
import { Segment, Accordion, Form, Card, Divider, Button, Message} from 'semantic-ui-react'

class Properties extends Component {
constructor(props){
    super(props)
    this.state = {
        vehicles : [],
        lands : [], 
        value : 0,
        check : '',
        name : '', 
        statusDelete : false,
        statusAddCar : false,
        statusAddLand: false,
        line : '',
        kind: 'automoviles'
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

    changeCheck = (event) => this.setState({ check : event.target.value })
    changeName = (event) => this.setState({ name: event.target.value })
    changeValue = (event) => this.setState({ value: event.target.value })
    changeLine = (event) => this.setState({ line : event.target.value })
    changeKind = (event) => this.setState({ kind : event.target.value})

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
                this.setState({ statusDelete: res.status })
                this.setState({ lands: res.lands})
                this.setState({ statusAddCar : false})
                this.setState( {statusAddLand : false })
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
                this.setState({ statusDelete : res.status })
                this.setState({ vehicles : res.vehicles})
                this.setState({ statusAddCar : false})
                this.setState( {statusAddLand : false})
            })
            .catch(err => console.log(err))
    }

    addVehicle = () => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('line', this.state.line)
        form.append('kind', this.state.kind)
        fetch('/add/car', {
            credentials: 'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({ line : ''})
                this.setState({ statusAddCar : res.status })
                this.setState({ vehicles : res.vehicles})
                this.setState( {statusAddLand : false})
                this.setState({statusDelete : false})
            })
            .catch(err => console.log(err))
    }

    addLand = () => {
        let headers = new Headers()
        headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
        headers.set('Content-Type', 'application/x-www-form-urlencoded')
        let form = new FormData()
        form.append('value', this.state.value)
        form.append('name', this.state.name)
        form.append('bill', this.state.bill)
        fetch('/add/land', {
            credentials: 'include',
            method: 'post',
            headers,
            body: this.serialize(form)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState( { value : 0})
                this.setState({ check : ''})
                this.setState({ name : ''})
                this.setState({ statusAddLand : res.status })
                this.setState({ lands: res.lands })
                this.setState({ statusDelete : false})
                this.setState( {statusAddCar : false})
            })
            .catch(err => console.log(err))
    }

    render(){

        const formLand = (
            <div>
                <Form.Input label='Identifier Name' placeholder='Name' name='name' value={this.state.name} onChange={this.changeName}/>
                <Form.Input type='number' label='Property Valuation' placeholder='Property Valuation' name='value' value={this.state.value} onChange={this.changeValue} />
                <Form.Checkbox name='bill' label='Do you receive digital bill?' value={this.state.check} onChange={this.changeCheck}/>
                <Form.Button color='purple' content='Add' onClick={this.addLand}/>
            </div>
        )

        const formCar = (
            <div>
                    <div className='field'>
                        <label>Brand of Vehicle</label>
                        <select name='kind' className='ui selection dropdown' onChange={this.changeKind}>
                            <option value="automoviles">AutoMóvil</option>
                            <option value="camoinetas">Camioneta</option>
                            <option value="doblecabina">Doblecabina</option>
                            <option value="electricos">Electríco o Híbrido</option>
                            <option value="motos">Motocicleta</option>
                        </select>
                    </div>   
                    <Form.Input fluid label='Line' placeholder='Line' name='line' value={this.state.line} onChange={this.changeLine}/>
                <Form.Button color='purple' content='Add' onClick={this.addVehicle}/>
            </div>
        )

        let cardC = this.state.vehicles.map( (vehicles) =>
            <Card 
            header = {vehicles.class}
            meta = {'Your vehicle'}
            description = {vehicles.line}
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
                    <Form>
                        <Accordion as={Form.Field} panels={panelsCar}/>
                    </Form>
                        <Divider/>
                        <Accordion panels={cardsCar}/>
                </Segment>
                <Divider hidden />
                <Segment>
                    <Form>
                        <Accordion as={Form.Field} panels={panelsLand} />
                    </Form>
                    <Divider />
                    <Accordion panels={cardsLand}/>
                </Segment>
                <Message
                    hidden={!this.state.statusDelete}
                    positive
                    content='Your have delete one element'
                />
                <Message
                    hidden={!this.state.statusAddCar}
                    positive
                    content='Your have added new vehicle'
                />
                <Message
                    hidden={!this.state.statusAddLand}
                    positive
                    content='Your have added new property'
                />
            </div>
        )
    }
}

export {Properties}