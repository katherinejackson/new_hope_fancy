import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import { getAllDogs } from "./routes/dog.routes";
import { addHomevisit as AddHomevisitAPI } from "./routes/homevisit.routes"
import { getAllStaff } from "./routes/staff.routes";

const AddHomevisit = ({ onAddNew, setShowAddNew }) => {
    const [staff, setStaff] = useState("")
    const [dog, setDog] = useState("")
    const [dogList, setDogList] = useState([])
    const [staffList, setStaffList] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        getDogs()
        getStaff()
    }, [])

    const addHomevisit = () => {
        if (dog) {
            AddHomevisitAPI({
                staff: staff,
                dog: dog,
            }).then(
                onAddNew()
            )
        } else {
            setError(true)
        }
    }

    const getDogs = () => {
        getAllDogs().then((result) => {
            setDogList(result)
        })
    }

    const getStaff = () => {
        getAllStaff().then((result) => {
            setStaffList(result)
        })
    }

    return (
        <div className="d-flex flex-column">
            <h2>Add a New HomeVisit</h2>

            {error ? <Alert variant='danger'>You must select a dog</Alert> : null}

            <label>Staff:</label>
            <select id="staffSelect" type="text" defaultValue={staff.first_name + " " + staff.last_name} onChange={(e) => setStaff(e?.target?.value)}>
                <option value={null} key="nullOp">None</option>
                {staffList.map(staff => (
                    <option value={staff.first_name + " " + staff.last_name} key={staff._id}>{staff.first_name + " " + staff.last_name}</option>
                ))}
            </select>

            <label>Dog:</label>
            <select id="dogSelect" type="text" defaultValue={dog} onChange={(e) => setDog(e?.target?.value)}>
                <option value="" key="nullOp">Please Select a Dog</option>
                {dogList.map(dog => (
                    <option value={dog.name} key={dog._id}>{dog.name}</option>
                ))}
            </select>


            <button className="btn btn-info m-2" onClick={addHomevisit}>Submit</button>
            <button className="btn btn-danger m-2" onClick={() => setShowAddNew(false)}>Cancel</button>
        </div>
    )
}

export default AddHomevisit