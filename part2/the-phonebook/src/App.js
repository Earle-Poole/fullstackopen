import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Message from "./components/Message";
import personService from "./services/persons";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState();

  useEffect(() => {
    personService.getAll().then(res => {
      setPersons(res);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      phoneNumber: newNumber
    };

    console.log("nameObject", nameObject)

    const duplicate = persons.find(person => person.name === nameObject.name);

    console.log("duplicate?", duplicate)

    if (duplicate) {
      const prompt = window.confirm(
        `${duplicate.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (prompt) {updatePerson(duplicate.id, nameObject.phoneNumber)}
      
    } else {
      personService.create(nameObject)
        .then(returnedPerson => {
          console.log("returnedPerson", returnedPerson)
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessageStatus(true);
          setMessage(`Added ${returnedPerson.name}`);
          personService.getAll().then(res => {
            setPersons(res);
          });
          setTimeout(() => {
            setMessageStatus(null);
            setMessage("");
          }, 5000)
        })
        .catch(err => {
          setMessageStatus(false)
          setMessage(err.response.data.err)
          setTimeout(() => {
            setMessageStatus(null);
            setMessage("");
          }, 5000)
        });
    }
  };

  const deletePerson = id => {
    const person = persons.find(n => n.id === id);
    const prompt = window.confirm(
      `Are you sure you want to delete ${person.name}`
    );

    if (prompt)
      personService
        .deletePerson(id)
        .then(() => {
          personService.getAll().then(res => {
            setPersons(res);
          });
        });
  };

  const updatePerson = (id, number) => {
    const person = persons.find(n => n.id === id);
    console.log("person inside of updatePerson", person)
    const changedNumber = { ...person, phoneNumber: number };
    console.log("changedNumber inside of updatePerson", changedNumber)

    personService.update(id, changedNumber).then(returnedPerson => {
      setPersons(
        persons.map(person => (person.id !== id ? person : returnedPerson))
      );
      setMessageStatus(true);
      setMessage(`Updated ${returnedPerson.name}'s number`);
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessageStatus(null);
        setMessage("");
      }, 5000);
    })
    .catch(err => {
      setMessageStatus(false);
      setMessage(`Information of ${person.name} has already been removed from server`);
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessageStatus(null);
        setMessage("");
      }, 5000);
    });
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageStatus={messageStatus} message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
