import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

function genMemberId(){
  const now = new Date();
  const datePart = `${String(now.getFullYear()).slice(2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  const rand = String(now.getTime()%10000).padStart(4,'0');
  return `MEM-${datePart}-${rand}`;
}

export default function ProfileForm(){
  const [firstName,setFirst] = useState("");
  const [lastName,setLast] = useState("");
  const [address,setAddr] = useState("");
  const [memberId,setMemberId] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    (async ()=>{
      if(!auth.currentUser) return;
      const ref = doc(db,"users",auth.currentUser.uid);
      const snap = await getDoc(ref);
      if(snap.exists()){
        const d = snap.data();
        setFirst(d.firstName||"");
        setLast(d.lastName||"");
        setAddr(d.address||"");
        setMemberId(d.memberId||"");
      }else{
        setMemberId(genMemberId());
      }
    })();
  },[]);

  async function save(){
    if(!auth.currentUser) return alert("Login required");
    setLoading(true);
    await setDoc(doc(db,"users",auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      phone: auth.currentUser.phoneNumber || null,
      email: auth.currentUser.email || null,
      firstName, lastName, address,
      memberId,
      updatedAt: serverTimestamp()
    }, { merge: true });
    setLoading(false);
    alert("Profile saved");
  }

  return (
    <div className="card">
      <b>Member Profile <span className="badge">{memberId||"Auto-ID"}</span></b>
      <div className="row">
        <div className="col">
          <input value={firstName} onChange={e=>setFirst(e.target.value)} placeholder="नाम"/>
        </div>
        <div className="col">
          <input value={lastName} onChange={e=>setLast(e.target.value)} placeholder="सरनेम"/>
        </div>
      </div>
      <textarea value={address} onChange={e=>setAddr(e.target.value)} placeholder="पता"></textarea>
      <button disabled={loading} onClick={save}>Save</button>
    </div>
  );
    }
