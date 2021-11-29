import React, { useState } from "react";

import { updateStaff as UpdateStaffAPI } from "./routes/staff.routes"

const UpdateStaff = ({ staff, onUpdate }) => {
    const id = staff.id
    const [fName, setFName] = useState(staff.first_name)
    const [lName, setLName] = useState(staff.last_name)
    const [phone, setPhone] = useState(staff.phone)

    const updateStaff = () => {
        UpdateStaffAPI({
            id: id,
            firstName: fName,
            lastName: lName,
            phone: phone,
        }).then(() => {
            onUpdate()
        }).catch((err) => {
            console.log('error', err)
        })
    }

    return (
        <div className="m-5">
            <h2>Update Staff</h2>
            <div className="col">
                <div className="row">
                    <label>First Name:</label>
                    <input id="fname" type="text" defaultValue={fName} onChange={(e) => setFName(e.target.value)} />
                </div>

                <div className="row">
                    <label>Last Name:</label>
                    <input id="lname" type="text" defaultValue={lName} onChange={(e) => setLName(e.target.value)} />
                </div>

                <div className="row">
                    <label>Phone:</label>
                    <input id="phone" type="text" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <button className="btn btn-info m-2" onClick={updateStaff}>Submit</button>
            </div>

        </div>
    )
}

export default UpdateStaff