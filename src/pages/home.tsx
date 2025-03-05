import { Link } from "react-router-dom"
import { BookOpen, Users, Lightbulb, Share2, Brain } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Thesis Forge: Your Research Companion
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover, develop, and collaborate on research projects that matter.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link to="/theses">Browse Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/thesis/new">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Thesis Forge</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Thesis Forge is a platform designed to assist students, doctoral candidates, and researchers in
                selecting and developing thesis and research projects. We provide tools and a community that facilitate
                finding inspiring topics, collaborating, and sharing knowledge.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Lightbulb className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Discover Ideas</h3>
              <p className="text-center text-muted-foreground">
                Browse and rate project ideas from a diverse community of researchers.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Share2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Share Resources</h3>
              <p className="text-center text-muted-foreground">
                Access and contribute code, URLs, presentations, and other valuable resources.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
              <Brain className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">AI Recommendations</h3>
              <p className="text-center text-muted-foreground">
                Get personalized topic recommendations based on your interests and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join our community and start your research journey in just a few simple steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Sign Up</h3>
                  <p className="text-muted-foreground">Create an account or sign in with your Google credentials.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Browse Projects</h3>
                  <p className="text-muted-foreground">
                    Explore thesis ideas and research projects from our community.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Rate and Comment</h3>
                  <p className="text-muted-foreground">
                    Provide feedback on projects and help others improve their research.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Add Your Ideas</h3>
                  <p className="text-muted-foreground">Share your own research ideas and get valuable feedback.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  5
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Collaborate</h3>
                  <p className="text-muted-foreground">
                    Connect with like-minded researchers and work together on projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  6
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Get AI Recommendations</h3>
                  <p className="text-muted-foreground">
                    Receive personalized topic suggestions based on your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contributing to the Community
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join our growing community of researchers and help shape the future of academic research.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-bold">Ways to Contribute</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Share your research ideas and resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Rate and comment on other projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  <span>Participate in discussions and provide feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Contribute code and improvements to the platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Spread awareness about Thesis Forge</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-lg bg-muted p-8">
                <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                <p className="mb-6 text-muted-foreground">
                  Be part of a growing network of researchers and help fellow academics succeed!
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link to="/theses">Get Started Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

