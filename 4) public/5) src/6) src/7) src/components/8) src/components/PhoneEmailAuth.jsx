import { useRef, useState } from "react";
import { auth, getRecaptcha, signInWithPhoneNumber, signInWithEmailAndPassword } from "../firebase";

export default function PhoneEmailAuth({ onLogin }){
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const recaptchaRef = useRef(null);

  async function sendOtp(){
    try{
      setLoading(true);
      const verifier = getRecaptcha("recaptcha-container");
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmObj(confirmation);
      alert("OTP भेज दिया गया");
    }catch(e){ alert("OTP error: "+e.message); }
    finally{ setLoading(false); }
  }

  async function verifyOtp(){
    if(!confirmObj) return;
    try{
      setLoading(true);
      await confirmObj.confirm(otp);
      onLogin();
    }catch(e){ alert("Verify error: "+e.message); }
    finally{ setLoading(false); }
  }

  async function emailLogin(e){
    e.preventDefault();
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    }catch(e){ alert("Email login failed: "+e.message); }
    finally{ setLoading(false); }
  }

  return (
    <div className="card">
      <b>Login (Phone / Email)</b>
      <div id="recaptcha-container" ref={recaptchaRef} />
      <div className="row">
        <div className="col">
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91xxxxxxxxxx"/>
          {confirmObj ? (
            <>
              <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP"/>
              <button disabled={loading} onClick={verifyOtp}>Verify OTP</button>
            </>
          ) : (
            <button disabled={loading} onClick={sendOtp}>Send OTP</button>
          )}
        </div>
        <div className="col">
          <form onSubmit={emailLogin}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin Email"/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
            <button disabled={loading} type="submit">Email Login</button>
          </form>
        </div>
      </div>
    </div>
  );
                               }
