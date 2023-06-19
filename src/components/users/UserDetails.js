import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMixologist } from '../../managers/UserManager'
import './user.css'

export const UserDetail = () => {

    const [mixologist, setMixologist] = useState({})
    const { mixologistId } = useParams()

    const getSelectedMixologist = () => {
        getMixologist(mixologistId)
            .then((mixologistData) => {
            setMixologist(mixologistData)
        })
    }

    useEffect(() => {
        getSelectedMixologist()
    }, [mixologistId])

    return (
        <div className="userDetailContainer">
            <h1>Mixologist Details</h1>
            <div className="userListRow">
                <div>
                    <span className="property">Name:</span> 
                    <span className="value">{mixologist.user?.first_name} {mixologist?.user?.last_name}</span>
                </div>
                <div>
                    <span className="property">Username:</span> 
                    <span className="value">{mixologist.user?.username}</span>
                </div>
                <div>
                    <span className="property">Creation Date:</span> 
                    <span className="value">{mixologist.created_on}</span>
                </div>
                <div>
                    <span className="property">Bio:</span> 
                    <span className="value">{mixologist.bio}</span>
                </div>
                {/* <div className="mixologist_subscribed">
              {
  mixologist.subscribed ?
  <button
  className="btn-3" onClick={(e) => {
    unsubscribeFromThisUser(e, mixologist.id)
  }}>Unsubscribe</button>
  :
  <button
  className="btn-2" onClick={(e) => {
    subscribeToThisUser(e, mixologist.id)
  }}>Subscribe</button>
}

              </div> */}
            </div>
        </div>
    )
}