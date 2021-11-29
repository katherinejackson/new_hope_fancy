import React, { useState, useEffect } from "react";
import { getAllDogs } from "./routes/dog";


const Dog = () => {
    const [dogList, setDogList] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getDogs()
    }, [])

    const getDogs = () => {
        getAllDogs().then((result) => {
            setDogList(result)
        })
    }

    const onUpdate = () => {
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Gender</th>
                            {/* <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {dogList.map((dog, index) => (
                            <tr key={dog.id} onClick={() => setSelected(index)}>
                                <td>{dog.id}</td>
                                <td>{dog.name}</td>
                                <td>{dog.breed}</td>
                                <td>{dog.age}</td>
                                <td>{dog.gender}</td>
                                {/* <td>{dogStatus[dog.status]}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <button className="btn btn-info m-2" onClick={() => setShowAddNew(true)}>Add New Dog</button> */}
        </div>
    )
}

export default Dog