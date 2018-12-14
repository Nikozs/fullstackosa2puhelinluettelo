import React from 'react'
import Person from './Person'


const Persons = ( props ) => {
    return (
    <div><h2>Numerot</h2>
    <table><tbody>
    {props.persons.map(person =>
    <Person key={person.name} person={person} remove={props.remove.bind(this,person.id)}/>
    
  )}

  </tbody></table></div>
    )}
    
export default Persons