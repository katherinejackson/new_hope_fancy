import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { updateHomevisit as UpdateHomevisitAPI, deleteHomevisit as DeleteHomevisitAPI } from "./routes/homevisit.routes"
import { homevisitStatus } from "./constants";
import { getAllDogs } from "./routes/dog.routes";
import { getAllStaff } from "./routes/staff.routes";

const UpdateHomevisit = ({ homevisit, onUpdate }) => {
    const id = homevisit._id
    const [dog, setDog] = useState(homevisit.dog)
    const [staff, setStaff] = useState(homevisit.staff)
    const [status, setStatus] = useState(homevisit.status)
    const [dogList, setDogList] = useState([])
    const [staffList, setStaffList] = useState([])

    useEffect(() => {
        getDogs()
        getStaff()
    }, [])

    const updateHomevisit = () => {
        UpdateHomevisitAPI({
            id: id,
            dog: dog,
            staff: staff,
            status: status,
        }).then(() => {
            onUpdate()
        }).catch((err) => {
            console.log('error', err)
        })
    }

    const deleteHomevisit = () => {
        DeleteHomevisitAPI({
            id: id,
        }).then(() => {
            onUpdate()
        }).catch((err) => {
            console.log('error', err)
        })
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
        <div className="m-5">
            <h2>Update Homevisit</h2>
            <div className="col">

                <div className="row">
                    <label>Staff:</label>
                    <select id="staffSelect" type="text" defaultValue={staff.first_name + " " + staff.last_name} onChange={(e) => setStaff(e?.target?.value)}>
                        <option value={null}>None</option>
                        {staffList.map(staff => (
                            <option value={staff.first_name + " " + staff.last_name} key={staff._id}>{staff.first_name + " " + staff.last_name}</option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <label>Dog:</label>
                    <select id="dogSelect" type="text" defaultValue={dog} onChange={(e) => setDog(e?.target?.value)}>
                        {dogList.map(dog => (
                            <option value={dog.name} key={dog._id}>{dog.name}</option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <label>Status:</label>
                    <select id="status" type="text" defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                        {Object.keys(homevisitStatus).map(status => (
                            <option value={status} key={`status-${status}`}>{homevisitStatus[status]}</option>
                        ))}
                    </select>
                </div>

                <Button variant="success" onClick={updateHomevisit}>Submit</Button>
                <Button variant="danger" onClick={deleteHomevisit}>Delete Homevisit</Button>
            </div>

        </div>
    )
}

export default UpdateHomevisit