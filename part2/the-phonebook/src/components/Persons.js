import React from "react";

const Persons = ({ filteredPersons }) => {
  const numbersArr = filteredPersons.map((person, i) => {
    return (
      <p key={i}>
        {person.name} {person.number}
      </p>
    );
  });
  return <div>{numbersArr}</div>;
};

export default Persons;
