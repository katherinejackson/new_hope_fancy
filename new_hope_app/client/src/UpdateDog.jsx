import React, { useEffect, useState } from "react";

import { updateDog as UpdateDogAPI } from "./routes/dog.routes"
import { dogStatus } from "./constants";

const UpdateDog = ({ dog, onUpdate }) => {
    const id = dog.id
    const [name, setName] = useState(dog.name || "")
    const [breed, setBreed] = useState(dog.breed || "")
    const [age, setAge] = useState(dog.age || "")
    const [gender, setGender] = useState(dog.gender || "")
    const [status, setStatus] = useState(dog.status || 0)

    const updateDog = () => {
        UpdateDogAPI({
            id: id,
            name: name,
            breed: breed,
            age: age,
            gender: gender,
            status: status,
        }).then(() => {
            onUpdate()
        }).catch((err) => {
            console.log('error', err)
        })
    }

    return (
        <div className="m-5">
            <h2>Update Dog</h2>
            <div className="col">
                <div className="row">
                    <label>Name:</label>
                    <input id="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="row">
                    <label>Breed:</label>
                    <input id="breed" type="text" defaultValue={breed} onChange={(e) => setBreed(e.target.value)} />
                </div>


                <div className="row">
                    <label>Age:</label>
                    <input id="age" type="text" defaultValue={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <div className="row">
                    <label>Gender:</label>
                    <input id="gender" type="text" defaultValue={gender} onChange={(e) => setGender(e.target.value)} />
                </div>

                <div className="row">
                    <label>Status:</label>
                    <select id="status" type="text" defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                    {Object.keys(dogStatus).map(status => (
                        <option value={status} key={`status-${status}`}>{dogStatus[status]}</option>
                    ))}
                    </select>
                </div>

                <button className="btn btn-info m-2" onClick={updateDog}>Submit</button>
            </div>

        </div>
    )
}

export default UpdateDog