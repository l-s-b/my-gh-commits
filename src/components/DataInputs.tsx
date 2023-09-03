import { useState } from "react";

export default function DataInputs() {

  const [user, setUser] = useState("");

  const handleUserSearch = () => {

  }

  return (
    <section
          className="flex fixed z-30 left-0 w-2/5 m-auto h-screen"
          style={{display: "flex", alignItems: "center"}}
        >
    <div
      className="flex flex-col gap-8 w-full m-auto px-4"
    >
      <div className="m-auto">
        <label htmlFor="">GitHub User</label>
        <div className="flex flex-row gap-2">
          <input type="text" className="w-3/4 bg-black" />
          <button type="button" onClick={handleUserSearch}>Go</button>
        </div>
      </div>
      <div className="m-auto">
        <label htmlFor="">Repository</label>
        <div className="flex flex-row gap-2">
          <input type="text" className="w-3/4 bg-black" />
          <button type="button">Go</button>
        </div>
      </div>
      <div className="m-auto">
        <label htmlFor="">Branch</label>
        <div className="flex flex-row gap-2">
          <input type="text" className="w-3/4 bg-black" />
          <button type="button">Go</button>
        </div>
      </div>
    </div>
    </section>
  );
}
