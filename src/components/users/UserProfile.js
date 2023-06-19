// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { deleteUser, updateUserDetail, updateUserProfile } from "../ApiManager";
// import { FaRegAddressBook } from "react-icons/fa";
// import "./profile.css";

// export const UserForm = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate()
//   const [feedback, setFeedback] = useState("");
//   const [profile, updateProfile] = useState({
//     email:"",
//     isLeader:"",
//     isExecutor:""
//   })

//   useEffect(() => {
//     if (feedback !== "") {
//       setTimeout(() => setFeedback(""), 3000);
//     }
//   }, [feedback]);

//   useEffect(() => {
//     updateUserDetail(userId)
//       .then((data) => {
//         const singleProfile = data[0];
//         updateProfile(singleProfile);
//       });
//   }, [userId]);

//   const deleteButton = () => {
//     return <button onClick={ () => {
//         deleteUser(userId)
//         .then(() => {
//             window.alert("Ungrateful Relative Is Dead to Us.")
//         })
//         .then(() => {
//             navigate("/")
//         })
//     }} className="btn__delete">You're Cut Off.</button>
// }

//   const handleSubmitButtonClick = (event) => {
//     event.preventDefault();

//     updateUserProfile(profile)
//       .then(() => {
//         window.alert("Profile Information successfully updated")
//       })
//       .then(() => {
//         navigate("/family_tree")
//       })
//   };
//   return (
//     <main className="profile-content">
//     <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
//         {feedback}
//     </div>
//     <form className="profile-form">
//       <h2>Edit Profile Details</h2>
        
//         <div className="form-group">
//         <div className="icon">
//                 <i className="fas fa-user">
//                   <FaRegAddressBook />
//                 </i>
//               </div>
//           <div className="div">
//           <input
//             required
//             autoFocus
//             type="text"
//             className="form-control"
//             value={profile.email}
//             onChange={(evt) => {
//               const copy = { ...profile };
//               copy.email = parseInt(evt.target.value);
//               updateProfile(copy);
//             }}
//           />
//           </div>
//         </div>
      
      
//         <div className="form-group">
//           <label htmlFor="isLeader">Leader:</label>
//           <input
//             required
//             autoFocus
//             type="checkbox"
//             checked={profile.isLeader}
//             className="form-control"
//             onChange={(evt) => {
//               const isCheckbox = evt.target.type === 'checkbox'
//               const copy = { ...profile };
//               copy.isLeader = isCheckbox ? evt.target.checked : evt.target.value;
//               updateProfile(copy);
//             }}
//           />
//         </div>
    
//         <div className="form-group">
//           <label htmlFor="isExecutor"> Executor:</label>
//           <input
//             required
//             autoFocus
//             type="checkbox"
//             className="form-control"
//             checked={profile.isExecutor}
//             onChange={(evt) => {
//               const isCheckbox = evt.target.type === 'checkbox'
//               const copy = { ...profile };
//               copy.isExecutor = isCheckbox ? evt.target.checked : evt.target.value;
//               updateProfile(copy);
//             }}
//           />
//         </div>
     

//       <button
//         onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
//         className="btn__profile"
//       >
//         Update Profile
//       </button>
//       {deleteButton()}
//     </form>
    
//     </main>
//   );
// };