import { useRef } from "react";

export default function MemberIDCard({ name, memberId }){
  const ref = useRef();
  function download(){
    const node = ref.current;
    const svg = new Blob([node.outerHTML], {type:"image/svg+xml"});
    const url = URL.createObjectURL(svg);
    const a = document.createElement("a");
    a.href = url; a.download = `ID-${memberId}.svg`; a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="card">
      <div ref={ref}>
        <svg width="420" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" rx="16" fill="#ffffff" stroke="#0ea5e9"/>
          <text x="20" y="40" font-size="22" font-family="Noto Sans Devanagari">बावरिया समाज</text>
          <text x="20" y="80" font-size="16">Name: {name}</text>
          <text x="20" y="110" font-size="16">Member ID: {memberId}</text>
        </svg>
      </div>
      <button onClick={download}>Download ID (SVG)</button>
    </div>
  );
}
