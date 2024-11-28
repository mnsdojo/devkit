import React from "react";
import Editor from "./editor.client";
import { getRandomShape } from "coolshapes-react";
function Page() {
  return (
    <div>
      <Editor initialShape={getRandomShape({ onlyId: true })} />
    </div>
  );
}

export default Page;
