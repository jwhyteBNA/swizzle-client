import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMixologist } from '../../managers/UserManager'
import './user.css'

export const UserDetail = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        getMixologist(userId)
            .then(setUser)
    }, [userId])

    return (
        <div className="userDetailContainer">
            <h1>User Details</h1>
            <div className="userListRow">
                <div>
                    <span className="property">Name:</span> 
                    <span className="value">{user.user.first_name} {user.user.last_name}</span>
                </div>
                {user.profile_image && 
                <div>
                    <img src={user.profile_image} alt="User profile"/>
                </div>}
                <div>
                    <span className="property">Username:</span> 
                    <span className="value">{user.user.username}</span>
                </div>
                <div>
                    <span className="property">Creation Date:</span> 
                    <span className="value">{new Date(user?.created_on).toLocaleDateString()}</span>
                </div>
                <div>
                    <span className="property">Bio:</span> 
                    <span className="value">{user?.bio}</span>
                </div>
                {/* <div className="rareUser_subscribed">
              {
  rareUser.subscribed ?
  <button
  className="btn-3" onClick={(e) => {
    unsubscribeFromThisUser(e, rareUser.id)
  }}>Unsubscribe</button>
  :
  <button
  className="btn-2" onClick={(e) => {
    subscribeToThisUser(e, rareUser.id)
  }}>Subscribe</button>
}

              </div> */}
            </div>
        </div>
    )
}