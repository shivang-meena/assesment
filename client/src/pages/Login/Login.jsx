import { useState } from "react";
import "../Otpverification/Otpverification.css"
import { useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [msg,setMsg]=useState();

 async function handleLogin(e){
    e.preventDefault();
  
          try {
        const res=await fetch("http://localhost:3000/user/login",{
            method:"POST",
            headers: {
        "Content-Type": "application/json"  
    },
            body:JSON.stringify({ email,password })
        });

        const data=await res.json();
        console.log(data);
        if(data?.success===true){
            navigate("/Welcome");
      setMsg("Loggedin");
        }
        if (data?.success===false) {
      setMsg(data?.message);
        }
    } catch (error) {
      setMsg(error.message);

    console.log(error);
    }
  
    
  }

  return (
    <>
      
      <div className="otp-page">
        <div className="otp-card">
          <div className="otp-card-header">
            <div className="icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
              <div>Login page</div>
            <p>Enter your Details</p>
             
          </div>
 
          <form onSubmit={handleLogin} > 
          <div className="otp-card-body">
           
            <div className="field">
              <label htmlFor="Email">Email</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg> 
                
                <input
                  id="Email"
                  type="email"
                  className=""
                  required
                  placeholder="jow@gmail.com"
                  value={email}
                  onChange={e => {setEmail(e.target.value)  }}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">One-time password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type="text"
                  className="****"
                  required
                  placeholder="password"
                  value={password}
                  onChange={e => { setpassword(e.target.value) }}
                />
              </div>
            </div>

            <hr className="divider" />
          <div>{msg}</div>
            <button className="submit-btn" >
              <div>Submit</div>
            </button>
 
          </div>
         </form>

        </div>
      </div>
    </>
  );
}