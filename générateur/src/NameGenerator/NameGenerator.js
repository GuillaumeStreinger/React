import React, { useState } from "react";
import PersonCard from "../PersonCard/PersonCard";
import "./NameGenerator.css"
const NameGenerator = () => {
    const [persons, setPersons] = useState([]);
    const [displayAsCSV, setDisplayAsCSV] = useState(false);

    const addNewLine = async () => {
        const response = await fetch("https://randomuser.me/api/");
        const result = await response.json();
        const newPerson = result.results[0];
        setPersons(persons.concat([newPerson]));
    };
    
    const deletePersons = (id) => {
        console.log({id});
        setPersons(persons.filter((person) => person.login.uuid !== id));
    }

    console.log({persons});
    return(
        <>
            <h1>Générateur de noms</h1>
            <div>
                <button onClick={addNewLine}>Nouvelle Ligne</button>
                <label>
                    <input 
                        type="checkbox" 
                        checked={displayAsCSV} 
                        onChange={() => setDisplayAsCSV(!displayAsCSV)}
                    />
                    Afficher en CSV
                </label>
            </div>
            <div className="Card-grid">
                {persons.map((person) => {
                    if (displayAsCSV) {
                        return (
                            <div key={person.login.uuid}>
                                <div>{person.login.uuid}, {person.name.first}, {person.name.last}, {person.gender}, {person.dob.date}</div>
                            </div>
                        )
                    } else {
                        return(
                            <PersonCard
                                key={person.login.uuid}
                                id={person.login.uuid}
                                firstName={person.name.first}
                                lastName={person.name.last}
                                gender={person.gender}
                                dateOfBirth={person.dob.date}
                                imageURL={person.picture.large}
                                onDelete={deletePersons}
                            />
                        ) 
                    }
                })}
            </div>
        </>
    );
};

export default NameGenerator;
