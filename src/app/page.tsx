import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Zap } from "lucide-react";

const tools = [
  {
    name: "JSON Formatter",
    description: "Format and prettify JSON data",
    link: "/json",
  },
  {
    name: "YouTube Downloader",
    description: "Download videos from YouTube",
    link: "/youtube",
  },
  {
    name: "Image Resizer",
    description: "Resize and optimize images",
    link: "/image",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    link: "/encoding",
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs",
    link: "/encoding",
  },
  {
    name: "Markdown Previewer",
    description: "Preview Markdown in real-time",
    link: "/markdown",
  },
  {
    name: "Color Picker",
    description: "Pick and convert colors",
    link: "/color",
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    link: "/regex",
  },
  {
    name: "File Hash Calculator",
    description: "Calculate file hashes",
    link: "/hash",
  },
  {
    name: "Text Diff Checker",
    description: "Compare text differences",
    link: "/diff",
  },
  { name: "QR Code Generator", description: "Generate QR codes", link: "/qr" },
  {
    name: "Password Generator",
    description: "Generate secure passwords",
    link: "/password",
  },
  {
    name: "Code Beautifier",
    description: "Beautify and format code",
    link: "/beautifier",
  },
  {
    name: "SVG to PNG Converter",
    description: "Convert SVG to PNG",
    link: "/svg",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div
         className="container px-4 md:px-6 max-w-7xl mx-auto"
         >
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                DevToolkit: Your All-in-One Developer Companion
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 px-4">
                Streamline your workflow with our comprehensive set of
                development tools. From code formatting to file conversion,
                we've got you covered.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Button asChild>
                <Link href="#tools">
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose DevToolkit?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto px-4">
                  Our toolkit is designed to make your development process
                  faster, easier, and more efficient.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 items-start lg:max-w-none px-4">
              {/* Cards remain the same */}
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Perform tasks quickly with our optimized tools, saving you
                    valuable development time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Perform tasks quickly with our optimized tools, saving you
                    valuable development time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Perform tasks quickly with our optimized tools, saving you
                    valuable development time.
                  </p>
                </CardContent>
              </Card>
              {/* Other cards remain the same */}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Our Tools
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
            {tools.map((tool) => (
              <Card key={tool.name}>
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={tool.link}
                    className="text-blue-500 hover:underline"
                  >
                    Use {tool.name}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
