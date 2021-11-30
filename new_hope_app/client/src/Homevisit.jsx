import React, { useState, useEffect } from "react";
import { getAllHomevisit } from "./routes/homevisit.routes";

import AddHomevisit from "./AddHomevisit"
import UpdateHomevisit from "./UpdateHomevisit";
import { homevisitStatus } from "./constants";

const Homevisit = () => {
    const [homevisitList, setHomevisitList] = useState([])
    const [selected, setSelected] = useState(null)
    const [showAddNew, setShowAddNew] = useState(false)

    useEffect(() => {
        getHomevisits()
    }, [])

    const getHomevisits = () => {
        getAllHomevisit().then((result) => {
            setHomevisitList(result)
        })
    }

    const onUpdate = () => {
        getHomevisits()
        setSelected(null)
    }

    const onAddNew = () => {
        setShowAddNew(false)
        getHomevisits()
    }

    return (
        <div>
            <h2>Homevisits</h2>
            <h3>Click on a homevisit to update its information </h3>
            <div className="d-flex flex-row">
                <table className="table w-50">
                    <thead>
                        <tr>
                            <th>Staff</th>
                            <th>Dog</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homevisitList.map((homevisit, index) => (
                            <tr key={homevisit._id} onClick={() => setSelected(index)}>
                                <td>{homevisit.staff ? homevisit.staff : ''}</td>
                                <td>{homevisit.dog}</td>
                                <td>{homevisitStatus[homevisit.status]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selected !== null ? (
                    <UpdateHomevisit key={homevisitList[selected]._id} homevisit={homevisitList[selected]} onUpdate={onUpdate} />
                ) : null}
            </div>
            
            {showAddNew ? (
                <div>
                    <AddHomevisit onAddNew={onAddNew} setShowAddNew={setShowAddNew}/>
                </div>
            ) : (
                <button className="btn btn-info m-2" onClick={() => setShowAddNew(true)}>Add New Homevisit</button>
            )}
        </div>
    )
}

export default Homevisit