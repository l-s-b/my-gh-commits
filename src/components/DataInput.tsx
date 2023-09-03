import React from "react";

export default function DataInput() {
  return (
    <div
      className="flex flex-col gap-8 w-full m-auto px-4"
    >
      <div className="m-auto">
        <label htmlFor="">GitHub User</label>
        <div className="flex flex-row gap-2">
          <input type="text" className="w-3/4 bg-black" />
          <button type="button">Go</button>
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
  );
}
