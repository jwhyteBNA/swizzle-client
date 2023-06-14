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
        <div className="userListContainer">
            <h1>User Management</h1>
            {users.map(user => (
                <div key={user.id} className="userListRow">
                    <div>
                        <span className="property">Username:</span> 
                        <Link to={`/mixologists/${user.id}`} className="value">{user.username}</Link>
                    </div>
                    <div><span className="property">First Name:</span> <span className="value">{user.first_name}</span></div>
                    <div><span className="property">Last Name:</span> <span className="value">{user.last_name}</span></div>
                    <div><span className="property">Email:</span> <span className="value">{user.email}</span></div>
                </div>
            ))}
        </div>
    )
}
