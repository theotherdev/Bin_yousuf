import {useState}  from "react";
export default function Gallery() {
  const [state, setstate]= useState(0);
    return (
   <section>
      <h1>Amazing scientists</h1>
      {JSON.stringify(state)}
      <button onClick={() => setstate(state + 1)}>Click me</button>
    </section>
  );
}