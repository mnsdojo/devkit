import { MarkdownPreviewer } from "./markdown-previewer.client";
export default function MarkdownPreviewerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Markdown Previewer
      </h1>
      <MarkdownPreviewer />
    </div>
  );
}
