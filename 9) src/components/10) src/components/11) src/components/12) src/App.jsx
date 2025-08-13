import { useEffect, useState } from "react";
import "./styles.css";
import SafeNotice from "./components/SafeNotice";
import PhoneEmailAuth from "./components/PhoneEmailAuth";
import ProfileForm from "./components/ProfileForm";
import AdminBroadcast from "./components/AdminBroadcast";
import MemberIDCard from "./components/MemberIDCard";
import { auth, signOut } from "./firebase";

export default function App(){
  const [user,setUser] = useState(null);
  const [displayName,setDisplayName] = useState("");
  const [memberId,setMemberId] = useState("");

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged(u=>{
      setUser(u||null);
    });
    return () => unsub();
  },[]);

  // प्रोफ़ाइल सेव होने के बाद इन वैल्यूज़ को props में पास कर सको तो अच्छा रहेगा;
  // अभी demo के लिए input से लेते हैं:
  const [tempName,setTempName] = useState("");
  const [tempMember,setTempMember] = useState("");

  return (
    <div className="container">
      <h1><img src="/logo.svg" alt="" className="logo"/> बावरिया समाज</h1>

      <SafeNotice/>

      {!user ? (
        <PhoneEmailAuth onLogin={()=>{}} />
      ) : (
        <div className="card">
          <div className="row">
            <div className="col"><b>Logged in:</b> {user.phoneNumber || user.email}</div>
            <div className="col"><button onClick={()=>signOut(auth)}>Logout</button></div>
          </div>
        </div>
      )}

      {user && (
        <>
          <div className="row">
            <div className="col"><ProfileForm/></div>
            <div className="col">
              <div className="card">
                <b>ID Preview</b>
                <input value={tempName} onChange={e=>setTempName(e.target.value)} placeholder="Name for ID"/>
                <input value={tempMember} onChange={e=>setTempMember(e.target.value)} placeholder="Member ID"/>
              </div>
              <MemberIDCard name={tempName||"Member"} memberId={tempMember||"MEM-0000"} />
            </div>
          </div>

          <AdminBroadcast/>
        </>
      )}
    </div>
  );
      }
