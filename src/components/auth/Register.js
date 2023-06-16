import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import {
  FaLock,
  FaUser,
  FaUserCircle,
  FaRegAddressBook,
  FaEye,
  FaEyeSlash,
  FaBook
} from "react-icons/fa";
import ss_neon from  "../../images/ss_neon.gif"
import "./Auth.css"

export const Register = ({setToken}) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value
      }

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <main className ="login-main">
      <div className="login-container">
        <div className="logo-img">
          <img src={ss_neon} />
        </div>
    <section className="login-content">
      <form className="form-detail" onSubmit={handleRegister}>
      <h2 className="title">Create An Account</h2>
      <Link to="/login" className="login-link">Back to Login</Link>

        <div className="input-div">
          <div className="i">
                <i className="fas fa-user">
                  <FaUser />
                </i>
              </div>
          <div className="div">
            <input className="input" type="text" placeholder="First Name" ref={firstName} />
          </div>
        </div>

        <div className="input-div">
        <div className="i">
                <i className="fas fa-user">
                  <FaUser />
                </i>
              </div>
          <div className="div">
            <input className="input" 
            placeholder="Last Name"
            type="text" ref={lastName} />
          </div>
        </div>

        <div className="input-div">
          <div className="i">
                <i className="fas fa-user">
                  <FaUserCircle />
                </i>
              </div>
          <div className="div">
            <input className="input" placeholder="Username" type="text" ref={username} />
          </div>
        </div>

        <div className="input-div">
        <div className="i">
                <i className="fas fa-user">
                  <FaRegAddressBook />
                </i>
              </div>
          <div className="div">
            <input className="input" type="email" placeholder="Email Address" ref={email} />
          </div>
        </div>

        <div className="input-div">
        <div className="i">
                <i className="fas fa-lock">
                  <FaLock />
                  <div className="fas" onClick={() => setVisible(!visible)}>
                    {visible ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </i>
              </div>
              <div className="div">
                <input className="input" type={visible ? "text" : "password"} placeholder="Password" ref={password} />
            </div>
            </div>

            <div className="input-div">
            <div className="i">
                <i className="fas fa-lock">
                  <FaLock />
                </i>
              </div>
            <div className="div">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
            </div>
          </div>

        <div className="input-div">
          <div className="i">
                <i className="fas fa-lock">
                  <FaBook />
                </i>
              </div>
          <div className="control">
            <textarea autoFocus
            rows="2"
            cols="50"className="textarea" type="text" placeholder="Tell us about yourself..." ref={bio}></textarea>
          </div>
        </div>

        <button className="login-btn" type="submit">Submit</button>


      </form>
    </section>
    </div>
    </main>
  )
}
