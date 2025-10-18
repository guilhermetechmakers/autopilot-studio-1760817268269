import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Calendar, FileText, Users } from "lucide-react";

export default function AIIntakePage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            AI-Assisted Client Intake
          </h1>
          <p className="text-xl text-text-secondary">
            Let our AI guide you through the perfect client qualification process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="flex items-center text-text-primary">
                <Calendar className="w-5 h-5 mr-2 text-brand-primary" />
                Book a Session
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Schedule a personalized AI intake session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-primary">
                Schedule Intake Call
              </Button>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="flex items-center text-text-primary">
                <FileText className="w-5 h-5 mr-2 text-brand-primary" />
                Instant Form
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Complete the intake form right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated">
                Start Form
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="surface-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-text-primary">
              <Bot className="w-5 h-5 mr-2 text-brand-primary" />
              AI Intake Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Smart Questions</h3>
                <p className="text-sm text-text-secondary">
                  AI generates follow-up questions based on your responses
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Qualification Scoring</h3>
                <p className="text-sm text-text-secondary">
                  Automatic lead scoring and qualification assessment
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Proposal Generation</h3>
                <p className="text-sm text-text-secondary">
                  AI creates initial proposal drafts from intake data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}