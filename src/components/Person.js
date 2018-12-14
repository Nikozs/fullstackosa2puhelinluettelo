import React from 'react'

const Person = ( props ) => {
    
    return (

    <tr key={props.person.name}>
    <td>{props.person.name}</td>
    <td> {props.person.number} </td><td><button onClick={props.remove}>Poista</button></td></tr>
   
    )}
    
export default Person