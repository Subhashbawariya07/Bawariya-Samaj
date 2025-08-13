import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

export default function AdminBroadcast(){
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [list,setList] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const q = query(collection(db,"broadcasts"), orderBy("createdAt","desc"));
    const unsub = onSnapshot(q, snap=>{
      setList(snap.docs.map(d=>({id:d.id, ...d.data()})));
    });
    return () => unsub();
  },[]);

  async function send(){
    if(!auth.currentUser) return alert("Admin login required");
    setLoading(true);
    await addDoc(collection(db,"broadcasts"), {
      title, body, target: "all", createdBy: auth.currentUser.uid, createdAt: serverTimestamp()
    });
    setLoading(false);
    setTitle(""); setBody("");
    alert("Broadcast created");
  }

  return (
    <div className="card">
      <b>Admin Broadcast</b>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Message"></textarea>
      <button disabled={loading} onClick={send}>Send to All</button>
      <div className="note">* Push notifications के लिए बाद में FCM वेब सेट करेंगे। अभी यह Firestore में सेव होकर App में दिखेगा।</div>
      <div style={{marginTop:12}}>
        <b>Recent</b>
        <ul>
          {list.map(it=><li key={it.id}><b>{it.title}</b> — {it.body}</li>)}
        </ul>
      </div>
    </div>
  );
}
