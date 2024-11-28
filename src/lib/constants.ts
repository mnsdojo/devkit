


import { 
  Code, 
  Layers, 
  Target, 
  Sparkles, 
  Download, 
  Image, 
  Link as LinkIcon, 
  Type, 
  Palette, 
  Regex, 
  FileText, 
  Diff, 
  QrCode, 
  Lock, 
  Brush, 
  Edit 
} from "lucide-react";

const tools = [
  {
    name: "JSON Formatter",
    description: "Format and prettify JSON data",
    link: "/json",
    icon: Code,
  },
  {
    name: "YouTube Downloader",
    description: "Download videos from YouTube",
    link: "/youtube",
    icon: Download,
  },
  {
    name: "Image Resizer",
    description: "Resize and optimize images",
    link: "/image",
    icon: Image,
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    link: "/encoding",
    icon: Sparkles,
  },
  {
    name: "URL Encoder/Decoder",
    description: "Encode and decode URLs",
    link: "/encoding",
    icon: LinkIcon,
  },
  {
    name: "Markdown Previewer",
    description: "Preview Markdown in real-time",
    link: "/markdown",
    icon: Type,
  },
  {
    name: "Color Picker",
    description: "Pick and convert colors",
    link: "/color",
    icon: Palette,
  },
  {
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    link: "/regex",
    icon: Regex,
  },
  {
    name: "File Hash Calculator",
    description: "Calculate file hashes",
    link: "/hash",
    icon: FileText,
  },
  {
    name: "Text Diff Checker",
    description: "Compare text differences",
    link: "/diff",
    icon: Diff,
  },
  { 
    name: "QR Code Generator", 
    description: "Generate QR codes", 
    link: "/qr",
    icon: QrCode 
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords",
    link: "/password",
    icon: Lock,
  },
  {
    name: "Code Beautifier",
    description: "Beautify and format code",
    link: "/beautifier",
    icon: Brush,
  },
  {
    name: "SVG to PNG Converter",
    description: "Convert SVG to PNG",
    link: "/svg",
    icon: Edit,
  },
  {
    name: "Shapes Generator",
    description: "Beautiful Shapes Generator",
    link: "/shapes",
    icon: Target,
  },
];

export default tools;
