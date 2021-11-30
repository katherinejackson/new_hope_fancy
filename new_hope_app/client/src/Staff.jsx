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
        setSelected(null)
    }

    const onAddNew = () => {
        setShowAddNew(false)
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff, index) => (
                            <tr key={staff._id} onClick={() => setSelected(index)}>
                                <td role="button">{staff.first_name}</td>
                                <td role="button">{staff.last_name}</td>
                                <td role="button">{staff.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selected !== null ? (
                    <UpdateStaff key={staffList[selected]._id} staff={staffList[selected]} onUpdate={onUpdate} />
                ) : null}
            </div>

            {showAddNew ? (
                <div>
                    <AddStaff onAddNew={onAddNew} setShowAddNew={setShowAddNew} />
                </div>
            ) : (
                <button className="btn btn-info m-2" onClick={() => setShowAddNew(true)}>Add New Staff</button>
            )}
        </div>
    )
}

export default Staff