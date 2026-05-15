import { useState } from "react";
import "./Otpverification.css"
import { useNavigate } from "react-router-dom";


export default function EmailOtpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState(null);
  const [emailErr, setEmailErr] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [step,setstep]=useState(0);

  const validate = () => {
    let valid = true;
    setEmailErr(false);
    setOtpErr(false);
    setMsg(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr(true);
      valid = false;
    }
    if (!otp || !/^\d{4,6}$/.test(otp)) {
      setOtpErr(true);
      valid = false;
    }
    if (!valid) {
      setMsg({ type: "error", text: "Please fix the errors above." });
    }
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setMsg({ type: "success", text: "✓ Verified successfully!" });
  };

 


async  function handleoptsend(e){
    e.preventDefault();
      if (email.trim()!=="") {
        setstep(1);
         try {
        const res=await fetch("http://localhost:3000/user/otp",{
            method:"POST",
            headers: {
        "Content-Type": "application/json"  
    },
            body:JSON.stringify({ email })
        });

        const data=await res.json();
        console.log(data);
    } catch (error) {
    console.log(error);
    }
      }
      return;
  }


 async function handlesverify(e){
    e.preventDefault();
  if (step===1) {
          try {
        const res=await fetch("http://localhost:3000/user/verify-otp",{
            method:"POST",
            headers: {
        "Content-Type": "application/json"  
    },
            body:JSON.stringify({ email,otp })
        });

        const data=await res.json();
        console.log(data);
        if(data?.success===true){
            console.log("yes verified ");
            navigate("/Registration",{ state: { emailid: email } });
        }
        if (data?.success===false) {
      setMsg({ type: "error", text: "Otp was not valid " });
        }
    } catch (error) {
    console.log(error);
    }
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
            <h2>Verify your Email first then register </h2>
            <p>Enter your email and the OTP sent to you.</p>
          </div>
 
          <form  onSubmit={(step===0)?handleoptsend:handlesverify}> 
          <div className="otp-card-body">
            <div className="field">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <input
                  id="email"
                  type="email"
                  className={emailErr ? "error" : ""}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailErr(false); }}
                />
              </div>
            </div>

            {(step===1)?<div className="field">
              <label htmlFor="otp">One-time password</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="otp"
                  type="text"
                  className={otpErr ? "error" : ""}
                  placeholder="4 digit code"
                  maxLength={4}
                  inputMode="numeric"
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, "")); setOtpErr(false); }}
                />
              </div>
              <p className="hint">Check your inbox or spam folder for the code.</p>
            </div>:<div></div>}

            <hr className="divider" />

            <button className="submit-btn" onClick={handleSubmit}>
             
              {(step===0)?<div>Request Otp</div>:<div> Verify & continue</div>}
            </button>

            {msg && (
              <div className={`msg ${msg.type === "success" ? "success" : "error-msg"}`}>
                {msg.text}
              </div>
            )}

            
          </div>
         </form>

        </div>
      </div>
    </>
  );
}