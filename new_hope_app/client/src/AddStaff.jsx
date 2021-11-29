import React, { useState } from "react";

import { addStaff as AddStaffAPI } from "./routes/staff.routes"

const AddStaff = () => {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [phone, setPhone] = useState("")

    const addStaff = () => {
        AddStaffAPI({
            firstName: fname,
            lastName: lname,
            phone: phone,
        })
    }

    return (
        <div className="col">
            <div className="row">
                <h2>Add a New Staff</h2>
                <label>First Name:</label>
                <input id="fname" type="text" defaultValue={fname} onChange={(e) => setfName(e.target.value)} />
            </div>

            <div className="row">
                <label>Last Name:</label>
                <input id="lname" type="text" defaultValue={lname} onChange={(e) => setlName(e.target.value)} />
            </div>

            <div className="row">
                <label>Phone:</label>
                <input id="phone" type="text" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <button className="btn btn-info m-2" onClick={addStaff}>Submit</button>
        </div>
    )
}

export default AddStaff