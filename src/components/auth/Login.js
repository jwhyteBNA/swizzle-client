import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { FaLock, FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa"
import ss_neon from  "../../images/ss_neon.gif"
import "./Auth.css"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)
  const [visible, setVisible]= useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token)
        navigate("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <main className="login-main">
      <div className="login-container">
        <div className="logo-img">
          <img src={ss_neon} />
        </div>
        <div className="login-content">
      <form className="login-form" onSubmit={handleLogin}>
      <h2 className="login-title">Welcome!</h2>
        <div className="input-div one">
        <div className="i">
                <i className="fas fa-user">
                  <FaUserCircle />
                </i>
              </div>
          <div className="div">
            <input className="input" type="text" placeholder="Username" ref={username} />
          </div>
        </div>

        <div className="input-div pass">
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

         <Link to="/register" className="login-link">Need to Register?</Link>
            <button className="login-btn" type="submit" >Enter Swizzle & Salud</button>
          
        {
          isUnsuccessful ?  window.alert("Oops, your password or username isn't right! Try again or register to enter.") : ''
        }
      </form>
      </div>
      </div>
    </main>
  )
}
