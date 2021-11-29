import React, { useState, useEffect } from "react";
import { getAllStaff } from "./routes/staff.routes";

import AddStaff from "./AddStaff"
import UpdateStaff from "./UpdateStaff";

const Staff = () => {
    const [staffList, setStaffList] = useState([])
    const [selected, setSelected] = useState(null)
    const [showAddNew, setShowAddNew] = useState(false)

    useEffect(() => {
        getStaff()
    }, [])

    const getStaff = () => {
        getAllStaff().then((result) => {
            setStaffList(result)
        })
    }

    const onUpdate = () => {
        getStaff()
    }

    return (
        <div>
            <h2>Staff</h2>
            <h3>Click on a staff to update their information </h3>
            <div className="d-flex flex-row">
                <table className="table w-50">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff, index) => (
                            <tr key={staff.id} onClick={() => setSelected(index)}>
                                <td>{staff.id}</td>
                                <td>{staff.first_name}</td>
                                <td>{staff.last_name}</td>
                                <td>{staff.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selected !== null ? (
                    <UpdateStaff key={staffList[selected].id} staff={staffList[selected]} onUpdate={onUpdate} />
                ) : null}
            </div>
            <button className="btn btn-info m-2" onClick={() => setShowAddNew(true)}>Add New Staff</button>
            {showAddNew ? (
                <div>
                    <AddStaff />
                    <button className="btn btn-danger m-2" onClick={() => setShowAddNew(false)}>Cancel</button>
                </div>
            ) : null}
        </div>
    )
}

export default Staff