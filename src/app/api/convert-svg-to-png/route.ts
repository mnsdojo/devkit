import { NextRequest, NextResponse } from "next/server";

import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pngBuffer = await sharp(buffer).png().toBuffer();
    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="converted.png"',
      },
    });
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
