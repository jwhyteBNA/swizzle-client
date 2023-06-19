import React, { useEffect, useState } from 'react'
import { getUsers } from '../../managers/UserManager'
import './user.css'
import { Link } from "react-router-dom"

export const MixologistList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
            .then(data => {
                const sortedData = data.sort((a, b) => a.username.localeCompare(b.username))
                setUsers(sortedData)
            })
    }, [])

    return (
        <section>
            <div className="detail_mgmt">
            <Link to="/tagmanager" className="navbar__item"> Tag Manager
            </Link>
            <Link to="/categorymanager" className="navbar__item"> Category Manager
            </Link>
            </div>
        <div className="userListContainer">
            <h1>Mixologists</h1>
            {users.map(user => (
                <div key={user.id} className="userListRow">
                    <div>
                        <span className="property">Username: 
                        <Link to={`/mixologists/${user.id}`} className="value"> {user.username}</Link></span> 
                    </div>
                    <div><span className="property"> Name: {user.first_name} {user.last_name}</span></div>
                    <div><span className="property">Email: {user.email}</span></div>
                </div>
            ))}
        </div>
        </section>
    )
}
