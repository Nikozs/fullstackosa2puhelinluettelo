import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
      /*  { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' } */
      ],
      newName: '',
      newNumber: '',
      error: null,
      showAll: true 
      
    }
    this.handlePersonDelete = this.handlePersonDelete.bind(this)
  }

componentDidMount() {
  axios
  .get('http://localhost:3001/persons')
  .then(response => {
    console.log('promise fulfilled')
    this.setState({ persons: response.data })
  })
}


handlePersonDelete = (event) => {
  function findPerson(arr,propName,propValue)
  {
    for (var i=0;i<arr.length;i++)
    {
      if (arr[i][propName]=== propValue)
      return arr[i];
    }
  }
  let person=findPerson(this.state.persons,"id",event)


  console.log('target',event)
  if (window.confirm('poistetaanko '+ person.name +' ?')) { 
   personsService
  .del(event)
  .then(
    this.setState({
      persons:this.state.persons.filter(person=> person.id!==event),
      error:`Henkilö '${person.name}' poistettu`
    }
    )
  )
  .catch(error => {
    this.setState({
      error: ` Henkilön '${person.name}' poistaminen ei onnistunut `,
    })
    setTimeout(() => {
      this.setState({error: null})
    }, 5000)
  }
  )
   setTimeout(() => {
        this.setState({error: null})
      }, 5000)
}}

 

  addPerson = (event) => {
    function inArray(target, array)
{

  for(var i = 0; i < array.length; i++) 
  {
    if (array[i].name===target.name)
    {
      console.log('Yhteystieto löytyi jo')
      return true;
    }
  }
  console.log('Yhteystieto ei löytynyt')
  return false; 
}   
      event.preventDefault()
      const personsObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      
      if (!inArray(personsObject, this.state.persons)) {
        console.log('Yhteystieto lisätty')

      
     personsService
     .create(personsObject)
     .then(response => {
       this.setState({
         persons: this.state.persons.concat(response.data),
         newName: '',
         newNumber: '',
         error: 'Yhteystieto '+personsObject.name+' lisätty'
       })  
       setTimeout(() => {
        this.setState({error: null})
      }, 5000)
     })
     .catch(error => {
      this.setState({
        error: ` Henkilön '${personsObject.name}' lisääminen ei onnistunut `,
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    })
    }
    }
  
  handleNameChange = (event) => {
    this.setState({newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value })
  }

  

  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <ul>
         <Notification message={this.state.error}/>
        </ul>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
            value={this.state.newName}
            onChange={this.handleNameChange}/>
          </div>      
          
          <div>
            numero: <input 
            value={this.state.newNumber}
            onChange={this.handleNumberChange}/>
        </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
       
        <Persons persons={this.state.persons} remove={this.handlePersonDelete}/>
        </div>
      )}
    
    
  }


export default App

ReactDOM.render(<App />, document.getElementById('root'));