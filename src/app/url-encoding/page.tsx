import React from "react";
import URLEncoderDecoder from "./url-encoding.client";

function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">URL Encoder/Decoder</h1>
      <URLEncoderDecoder />
    </div>
  );
}

export default Page;
