import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const {toastSuccess, forgotPassword} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleOnSubmit = (event) =>{
        event.preventDefault()
        const email = event.target.email.value
        forgotPassword(email)
        .then(() => {
            toastSuccess("Link is sent in your Email account. Check at spam!")
        navigate("/auth/login")
        })
        
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100     shadow-2xl">
          <div className="card-body max-w-10/10 p-5">
            <form onSubmit={handleOnSubmit} className='bg-white rounded-md  p-2 '>
                <fieldset className='fieldset'>
                    <label className='label'>Your email</label>
                <input type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required/>
                
                
                </fieldset>
                <button className="btn">Send Reset link</button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;