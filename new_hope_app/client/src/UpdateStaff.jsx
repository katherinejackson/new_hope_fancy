import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumber } from 'libphonenumber-js'
import { Alert } from "react-bootstrap";

import { updateStaff as UpdateStaffAPI } from "./routes/staff.routes"

const UpdateStaff = ({ staff, onUpdate }) => {
    const id = staff.id
    const [fName, setFName] = useState(staff.first_name)
    const [lName, setLName] = useState(staff.last_name)
    const [phone, setPhone] = useState(staff.phone)
    const [error, setError] = useState(false)

    const updateStaff = () => {
        if (fName && lName && parsePhoneNumber(phone, 'CA').isValid()) {
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
        } else {
            setError(true)
        }
    }

    return (
        <div className="m-5">
            <h2>Update Staff</h2>

            {error ? <Alert variant='danger'>Error in form</Alert> : null}

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
                    <PhoneInput id="phone" defaultValue={phone} onChange={(e) => setPhone(e)} />
                </div>

                <button className="btn btn-info m-2" onClick={updateStaff}>Submit</button>
            </div>

        </div>
    )
}

export default UpdateStaff