import React, { useState, useEffect } from "react";
import axifunctions from "./services/axifunctions";
import "./App.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};
const Henkilot = props => {
  const filteredPersons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.newFilter.toLowerCase())
  );

  return filteredPersons.map((person, index) => {
    return (
      <Person
        key={index}
        person={person}
        remove={props.remove}
        setPersons={props.setPersons}
        persons={props.persons}
        setErrorMessage={props.setErrorMessage}
      />
    );
  });
};
const Person = ({ person, setPersons, persons, setErrorMessage }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button
        onClick={e => {
          if (window.confirm(`Poistetaanko ${person.name}?`))
            axifunctions.remove(person.id).then(() => {
              const newPersons = persons.filter(p => {
                return person.id !== p.id;
              });
              setPersons(newPersons);
              setErrorMessage(`Henkilö '${person.name}' on poistettu`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        }}
      >
        poista
      </button>
    </div>
  );
};

const Filter = props => {
  return (
    <div>
      <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  );
};

const Form = props => {
  return (
    <form onSubmit={props.submit}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange} />
        numero:
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axifunctions.getAll().then(returnedPersons => {
      setPersons(returnedPersons);
    });
  }, []);

  const submit = event => {
    event.preventDefault();

    if (!newName) {
      alert("Name undefined");
      return;
    }
    if (!newNumber) {
      alert("Number undefined");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    const filter = persons.filter(person => person.name === newName);

    if (filter.length > 0) {
      const id = filter[0].id;
      if (
        window.confirm(`${newName} löytyy jo listasta. Päivitetäänkö numero?`)
      ) {
        const person = persons.find(person => person.id === id);
        const changedPerson = { ...person, number: newNumber };
        setNewName("");
        setNewNumber("");
        axifunctions.update(id, changedPerson).catch(error => {
          setErrorMessage(
            `Henkilö '${person.name}' on jo poistettu palvelimelta`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
        axifunctions.getAll().then(initialPersons => {
          setPersons(initialPersons);
        });
      } else {
        return;
      }
    } else {
      axifunctions
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Henkilö '${newName}' on lisätty`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setNewNumber("");
          setNewName("");
        })
        .catch(error => {
          setErrorMessage(JSON.stringify(error.response.data.error));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      <h2>Puhelinluettelo</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi henkilö</h2>
      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submit={submit}
      />
      <h2> Henkilöt </h2>
      <Henkilot
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
