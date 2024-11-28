'use client';

import { JsonFormatter } from "./json-formatter.client";
export default function JsonFormatterPage() {
  return (
    <div className="container mx-auto py-10">
      <style jsx global>{`
        .token.property {
          color: #f92672;
        }
        .token.string {
          color: #a6e22e;
        }
        .token.number {
          color: #ae81ff;
        }
        .token.boolean {
          color: #66d9ef;
        }
        .token.null {
          color: #fd971f;
        }
      `}</style>
      <h1 className="text-3xl font-bold mb-6 text-center">JSON Formatter</h1>
      <JsonFormatter />
    </div>
  );
}
