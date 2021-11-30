import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumber } from 'libphonenumber-js'
import { Alert } from "react-bootstrap";

import { addStaff as AddStaffAPI } from "./routes/staff.routes"

const AddStaff = ({ onAddNew, setShowAddNew }) => {
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)

    const addStaff = () => {
        if (fname 
            && lname 
            && (!phone || parsePhoneNumber(phone, 'CA').isValid())) {
            setError(false)
            AddStaffAPI({
                firstName: fname,
                lastName: lname,
                phone: phone,
            }).then(onAddNew())
        } else {
            setError(true)
        }
    }

    return (
        <div className="col">
            <h2>Add a New Staff</h2>

            {error ? <Alert variant='danger'>Error in form</Alert> : null}
            
            <div className="row">  
                <label>First Name:</label>
                <input id="fname" type="text" defaultValue={fname} onChange={(e) => setfName(e.target.value)} />
            </div>

            <div className="row">
                <label>Last Name:</label>
                <input id="lname" type="text" defaultValue={lname} onChange={(e) => setlName(e.target.value)} />
            </div>

            <div className="row">
                <label>Phone:</label>
                <PhoneInput id="phone" value={phone} onChange={(e) => setPhone(e)} />
            </div>

            <button className="btn btn-info m-2" onClick={addStaff}>Submit</button>
            <button className="btn btn-danger m-2" onClick={() => setShowAddNew(false)}>Cancel</button>
        </div>
    )
}

export default AddStaff