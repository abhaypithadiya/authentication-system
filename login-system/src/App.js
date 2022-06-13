import { useState } from "react";
import "./App.css";
import { authentication } from "./firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {
  //Country Code
  const countryCode = "+91";
  //Phone Number State
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP,setOTP] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);

  const captchaModule = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, authentication);
  }

  //Request OTP Action
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 13) {
      setExpandForm(true);
      captchaModule();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
        let message = <p className="errorMessage">Database Error Occurred!</p>;
        setErrorMessage(message);
      });
    } else {
      let message = <p className="errorMessage">Enter a Valid Phone Number to Continue!</p>;
      setErrorMessage(message);
    }
  };

  //Verify OTP Action
  const verifyOTP = (e)=>{
    e.preventDefault();
    if(OTP.length === 6){
      let confirmationResult = window.confirmationResult;

      setErrorMessage('');
      let pending = <p className="successMessage">Authenticating...</p>;
      setSuccessMessage(pending);
      confirmationResult.confirm(OTP).then((result) => {
        // User signed in successfully.
        const user = result.user;
        fetch("/register",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            number:phoneNumber,
            otp:OTP
          })
        })
        setErrorMessage('');
        let message = <p className="successMessage">Login In Successful</p>;
        setSuccessMessage(message);
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        let message1 = <p className="errorMessage">The OTP doesn't Match! Enter Correct OTP to continue.</p>;
        setSuccessMessage('');
        setErrorMessage(message1);
      });
    } else {
      let message1 = <p className="errorMessage">Enter a Valid OTP.</p>;
      setErrorMessage(message1);
    }

  }

  return (
    <div className="App">
      <div className="formContainer">
      <div className="wrap-contact100">

          {expandForm === true?
          <>
        <form onSubmit={verifyOTP}>
          <div className="wrap-input100">
            <span className="label-input100" style={{fontSize:"18px"}}>Please enter the OTP sent to your Number</span>
            <input style={{marginTop:"18px"}} type='number' className="input100" id='otpInput' value={OTP} onChange={(e)=>setOTP(e.target.value)} placeholder="Enter your OTP" autoComplete="off"/>
          </div>
            {successMessage}
            {errorMessage}
          <div className="container-contact100-form-btn">
            <div className="wrap-contact100-form-btn">
              <div className="contact100-form-bgbtn"></div>
              <button className="contact100-form-btn">
                <span>Verify OTP</span>
              </button>
            </div>
          </div>
        </form>
          </>
          :
          <form onSubmit={requestOTP}>
          <span className="contact100-form-title">Login In</span>
          <div className="wrap-input100">
            <span className="label-input100">Phone Number</span>
            <input type="tel" className="input100" id="phoneNumberInput" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Enter your Phone Number" autoComplete="off"/>
          </div>
            {errorMessage}
          <div className="container-contact100-form-btn">
            <div className="wrap-contact100-form-btn">
              <div className="contact100-form-bgbtn"></div>
              <button className="contact100-form-btn">
                <span>Request OTP</span>
              </button>
            </div>
          </div>
        </form>
          }
      </div>
      <div id='recaptcha-container'></div>
      </div>
    </div>
  );
}

export default App;