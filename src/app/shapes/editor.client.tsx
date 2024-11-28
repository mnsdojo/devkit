"use client";
import React from "react";
import { Coolshape, getRandomShape, shapes } from "coolshapes-react";

import { useState } from "react";
import ShapeEditor from "react-simple-code-editor";

function Editor({ initialShape }: { initialShape: any }) {
  const [shape, setShape] = useState(initialShape);
  const [noise, setNoise] = useState(false);
  return <div>
    
  </div>;
}

export default Editor;
