import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMixologist,
  resubscribeToMixologist,
  subscribeToMixologist,
  unsubscribeFromMixologist,
} from "../../managers/UserManager";
import "./user.css";

export const UserDetail = () => {
  const [mixologist, setMixologist] = useState({});
  const { mixologistId } = useParams();

  const getSelectedMixologist = () => {
    getMixologist(mixologistId).then((mixologistData) => {
      setMixologist(mixologistData);
    });
  };

  useEffect(() => {
    getSelectedMixologist();
  }, [mixologistId]);

  const handleSubscriptions = () => {
    if (mixologist.subscribed) {
      return (
        <button
          className="btn-3"
          onClick={(e) => {
            unsubscribeFromThisUser(e, mixologist.user.id);
          }}
        >
          Unsubscribe
        </button>
      );
    } else if (mixologist.unsubscribed) {
      return (
        <button
          className="btn-1"
          onClick={(e) => {
            resubscribeToThisUser(e, mixologist.user.id);
          }}
        >
          Resubscribe
        </button>
      );
    } else {
      return (
        <button
          className="btn-2"
          onClick={(e) => {
            subscribeToThisUser(e, mixologist.user.id);
          }}
        >
          Subscribe
        </button>
      );
    }
  };

  const subscribeToThisUser = (e, userId) => {
    e.preventDefault();
    subscribeToMixologist(userId).then(
      () => getMixologist(userId).then((data) => setMixologist(data)),
      window.alert(`You have subscribed to ${mixologist.user.username}!`)
    );
  };

  const unsubscribeFromThisUser = (e, userId) => {
    e.preventDefault();
    const confirmed = window.confirm(
        `Are you sure you want to unsubscribe from ${mixologist.user.username}?`
      );
      if (confirmed) {
      unsubscribeFromMixologist(userId).then(
        () => getMixologist(userId).then((data) => setMixologist(data)),
        window.alert("You have successfully unsubscribed!")
      );
    }
  };

  const resubscribeToThisUser = (e, userId) => {
    e.preventDefault();
    resubscribeToMixologist(userId).then(
      () => getMixologist(userId).then((data) => setMixologist(data)),
      window.alert(
        `You have successfully resubscribed to ${mixologist.user.username}`
      )
    );
  };

  return (
    <div className="userDetailContainer">
      <h1>Mixologist Details</h1>
      <div className="userListRow">
        <div>
          <span className="property">Name:</span>
          <span className="value">
            {mixologist.user?.first_name} {mixologist?.user?.last_name}
          </span>
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
        <div className="mixologist_subscribed">{handleSubscriptions()}</div>
      </div>
    </div>
  );
};
