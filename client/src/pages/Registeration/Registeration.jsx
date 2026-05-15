import { useState } from "react";
import "../Otpverification/Otpverification.css"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const navigate = useNavigate();
    const location = useLocation();
     const { emailid } = location.state || { emailid: "" };
    
  const [email, setEmail] = useState(emailid);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [msg,setMsg]=useState();

 async function handleregister(e){
    e.preventDefault();
  
          try {
        const res=await fetch("https://assesment-h8vv.onrender.com/user/registeration",{
            method:"POST",
            headers: {
        "Content-Type": "application/json"  
    },
            body:JSON.stringify({ email,name,password })
        });

        const data=await res.json();
    
        if(data?.success===true){
      setMsg("registered");
         navigate("/Login");
          
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
            <p>Enter your Details</p>
             <div>Registeration Page</div>
          </div>
 
          <form onSubmit={handleregister} > 
          <div className="otp-card-body">
           
            <div className="field">
              <label htmlFor="name">Name</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <input
                  id="name"
                  type="text"
                  className=""
                  required
                  placeholder="joe"
                  value={name}
                  onChange={e => {setname(e.target.value)  }}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Enter password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type="text"
                  className=""
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