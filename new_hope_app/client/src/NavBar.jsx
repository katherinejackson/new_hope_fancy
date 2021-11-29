import React from "react"

const NavBar = ({ setMode }) => {
    return (
        <div className="d-flex flex-column p-2">
            <button className="btn btn-info m-2" onClick={() => setMode(null)}>Home</button>
            <button className="btn btn-info m-2" onClick={() => setMode('dog')}>Dogs</button>
            <button className="btn btn-info m-2" onClick={() => setMode('staff')}>Staff</button>
            <button className="btn btn-info m-2" onClick={() => setMode('homevisit')}>Homevisits</button>
        </div>
    )
}

export default NavBar