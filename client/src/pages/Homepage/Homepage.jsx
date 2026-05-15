import "../Otpverification/Otpverification.jsx"
import { Link } from "react-router-dom";
export default function EntryPage() {



    return (
        <>

            <div className="entry-container">
                <h1 style={{ marginBottom: '30px' }}>Welcome</h1>
                <div className="button-group">
               
               <Link to={"/Login"} >
                    <button className="auth-btn login-btn">
                        Login
                    </button>
                </Link>

               <Link to={"/verification"} >
                    <button className="auth-btn signup-btn">
                        Sign Up
                    </button>
               </Link>

                </div>
            </div>
        </>
    );
}