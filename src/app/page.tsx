import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Sparkles,
  Pen as Tool,
  Link as LinkIcon,
} from "lucide-react";
import tools from "@/lib/constants";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-48 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl max-w-4xl">
            DevToolkit: Your Developer Companion
          </h1>
          <p className="max-w-[750px] text-muted-foreground text-lg px-4">
            Accelerate your development workflow with a powerful suite of tools
            designed to simplify complex tasks and boost your productivity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
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
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Why DevToolkit?
          </h2>
          <p className="max-w-[750px] mx-auto text-muted-foreground px-4">
            We've crafted a toolkit that transforms your development experience
            with speed, efficiency, and intuitive design.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              description:
                "Optimized tools that execute tasks in milliseconds.",
            },
            {
              icon: Tool,
              title: "Comprehensive",
              description:
                "A wide range of tools covering multiple development needs.",
            },
            {
              icon: Sparkles,
              title: "User-Friendly",
              description:
                "Intuitive interfaces that make complex tasks simple.",
            },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-6 w-6 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Tools</h2>
          <p className="max-w-[750px] mx-auto text-muted-foreground px-4">
            A comprehensive collection of developer utilities to streamline your
            workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.name}>
              <CardHeader className="flex flex-row items-center space-x-4">
                <tool.icon className="h-6 w-6" />
                <div>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={tool.link} className="text-primary hover:underline">
                  Use {tool.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
