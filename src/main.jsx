import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{textAlign:"center",marginTop:"100px",fontFamily:"Arial"}}>
      <h1>🌱 AgroAI Crop Disease Detection</h1>
      <p>Upload crop images to detect plant diseases using AI.</p>

      <input type="file" />

      <br/><br/>

      <button style={{
        padding:"10px 20px",
        background:"green",
        color:"white",
        border:"none",
        borderRadius:"5px"
      }}>
        Analyze Crop
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
