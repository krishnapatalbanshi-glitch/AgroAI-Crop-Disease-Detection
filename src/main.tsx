import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{textAlign:"center",marginTop:"100px"}}>
      <h1>🌱 AgroAI Crop Disease Detection</h1>
      <p>Upload crop images to detect diseases using AI.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
