import React, { useEffect, useState } from "react";

import { updateHomevisit as UpdateHomevisitAPI } from "./routes/homevisit.routes"
import { homevisitStatus } from "./constants";
import { getAllDogs } from "./routes/dog.routes";
import { getAllStaff } from "./routes/staff.routes";

const UpdateHomevisit = ({ homevisit, onUpdate }) => {
    const id = homevisit.id
    const [dog, setDog] = useState(homevisit.dogid)
    const [staff, setStaff] = useState(homevisit.staffid)
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
                    <select id="staffSelect" type="text" defaultValue={staff} onChange={(e) => setStaff(e?.target?.value)}>
                        {staffList.map(staff => (
                            <option value={staff.id} key={staff.id}>{staff.first_name + " " + staff.last_name}</option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <label>Dog:</label>
                    <select id="dogSelect" type="text" defaultValue={dog} onChange={(e) => setDog(e?.target?.value)}>
                        {dogList.map(dog => (
                            <option value={dog.id} key={dog.id}>{dog.name}</option>
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

                <button className="btn btn-info m-2" onClick={updateHomevisit}>Submit</button>
            </div>

        </div>
    )
}

export default UpdateHomevisit