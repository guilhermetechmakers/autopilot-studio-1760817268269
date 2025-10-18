import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Bot, 
  FileText, 
  Zap, 
  DollarSign, 
  Users, 
  BarChart3,
  CheckCircle,
  Star,
  Github
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base via-surface-sunken to-surface-elevated">
      {/* Header */}
      <header className="border-b border-borders-strong">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">Autopilot Studio</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-text-secondary hover:text-text-primary transition-colors">Testimonials</a>
            <a href="/help" className="text-text-secondary hover:text-text-primary transition-colors">Help</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-text-secondary hover:text-text-primary">
              Sign In
            </Button>
            <Button className="btn-primary">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              🚀 Now in Beta
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
              The Unified Business OS for
              <span className="text-gradient block">AI Development Agencies</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
              Automate your entire service pipeline from intake through project handover. 
              Streamline lead qualification, proposal generation, project setup, and billing—all with built-in AI copilots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary text-lg px-8 py-6">
                Book AI Intake
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-borders-strong text-text-primary hover:bg-surface-elevated">
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Everything You Need to Scale Your Agency
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From initial client intake to project handover, we've got every step covered with AI-powered automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover surface-card h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <CardTitle className="text-text-primary">{feature.title}</CardTitle>
                    <CardDescription className="text-text-secondary">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 bg-surface-sunken">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Seamless Integrations
            </h2>
            <p className="text-text-secondary mb-12">
              Connect with your favorite tools and platforms
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <Github className="w-12 h-12 text-text-muted" />
              <div className="w-12 h-12 bg-text-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-surface-base">QB</span>
              </div>
              <div className="w-12 h-12 bg-text-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-surface-base">Stripe</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Ready to Transform Your Agency?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join hundreds of AI development agencies already using Autopilot Studio to streamline their operations.
            </p>
            <Button size="lg" className="btn-primary text-lg px-8 py-6">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-borders-strong bg-surface-sunken">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-text-primary">Autopilot Studio</span>
              </div>
              <p className="text-text-secondary">
                The unified business OS for AI development agencies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="#features" className="hover:text-text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a></li>
                <li><a href="/help" className="hover:text-text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Company</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="/privacy-policy" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="hover:text-text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Support</h3>
              <ul className="space-y-2 text-text-secondary">
                <li><a href="/help" className="hover:text-text-primary transition-colors">Help Center</a></li>
                <li><a href="mailto:support@autopilotstudio.com" className="hover:text-text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-borders-strong mt-8 pt-8 text-center text-text-secondary">
            <p>&copy; 2024 Autopilot Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Bot,
    title: "AI-Assisted Intake",
    description: "Conversational UI with branching questions and LLM-generated follow-ups for perfect client qualification."
  },
  {
    icon: FileText,
    title: "Proposal & SoW Generation",
    description: "Template engine with AI-powered draft generation, e-signature integration, and version control."
  },
  {
    icon: Zap,
    title: "Project Scaffolding",
    description: "Automated project setup with milestone templates, repo integrations, and CI/CD mapping."
  },
  {
    icon: Bot,
    title: "AI Copilot Workspace",
    description: "Generate specs, acceptance criteria, change requests, and meeting notes with built-in approval workflows."
  },
  {
    icon: BarChart3,
    title: "Repository Sync",
    description: "Real-time commit analysis, PR mapping to tasks, and automated status reporting for complete visibility."
  },
  {
    icon: DollarSign,
    title: "Billing & Invoicing",
    description: "Milestone-based billing, time tracking integration, QuickBooks sync, and profit analytics."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Automated standups, status reports, launch checklists, and handover pack generation."
  },
  {
    icon: CheckCircle,
    title: "Launch Automation",
    description: "QA checklists, deployment integrations, release notes, and stakeholder communication automation."
  },
  {
    icon: Star,
    title: "Client Portal",
    description: "Branded client experience with deliverable approvals, feedback capture, and support integration."
  }
];