import React, { useState, useEffect } from "react";
import { getAllDogs } from "./routes/dog.routes";

import AddDog from "./AddDog"
import UpdateDog from "./UpdateDog";
import { dogStatus } from "./constants";

const Dog = () => {
    const [dogList, setDogList] = useState([])
    const [selected, setSelected] = useState(null)
    const [showAddNew, setShowAddNew] = useState(false)

    useEffect(() => {
        getDogs()
    }, [])

    const getDogs = () => {
        getAllDogs().then((result) => {
            setDogList(result)
        }).catch(err => {
            console.log(err)
        })
    }

    const onUpdate = () => {
        getDogs()
        setSelected(null)
    }

    const onAddNew = () => {
        setShowAddNew(false)
        getDogs()
    }

    return (
        <div>
            <h2>Dogs</h2>
            <h3>Click on a dog to update their information </h3>
            <div className="d-flex flex-row">
                <table className="table w-75">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dogList.map((dog, index) => (
                            <tr key={dog._id} onClick={() => setSelected(index)}>
                                <td role="button">{dog.name}</td>
                                <td role="button">{dog.breed}</td>
                                <td role="button">{dog.age}</td>
                                <td role="button">{dog.gender}</td>
                                <td role="button">{dogStatus[dog.status]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selected !== null ? (
                    <UpdateDog key={dogList[selected]._id} dog={dogList[selected]} onUpdate={onUpdate} />
                ) : null}
            </div>
            <button className="btn btn-info m-2" onClick={() => setShowAddNew(true)}>Add New Dog</button>
            {showAddNew ? (
                <div>
                    <AddDog onAddNew={onAddNew} />
                    <button className="btn btn-danger m-2" onClick={() => setShowAddNew(false)}>Cancel</button>
                </div>
            ) : null}
        </div>
    )
}

export default Dog