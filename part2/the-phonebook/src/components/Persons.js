import React from "react";

const Persons = ({ filteredPersons, deletePerson }) => {
  const numbersArr = filteredPersons.map((person, i) => {
    return (
      <p key={i}>
        {person.name} {person.number} 
        <button onClick={() => {deletePerson(person.id)}}>delete</button>
      </p>
    );
  });
  return <div>{numbersArr}</div>;
};

export default Persons;
