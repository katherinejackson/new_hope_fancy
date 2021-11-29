import React, { useState } from "react";

import { addDog as AddDogAPI } from "./routes/dog.routes"

const AddDog = () => {
    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")

    const addDog = () => {
        AddDogAPI({
            name: name,
            breed: breed,
            age: age,
            gender: gender,
        })
    }

    return (
        <div className="m-5">
            <h2>Add a New Dog</h2>
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

                <button className="btn btn-info m-2" onClick={addDog}>Submit</button>
            </div>

        </div>
    )
}

export default AddDog