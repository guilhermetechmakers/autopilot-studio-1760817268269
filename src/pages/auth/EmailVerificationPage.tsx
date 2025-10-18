import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Mail, CheckCircle, Clock, ArrowRight } from "lucide-react";

export default function EmailVerificationPage() {
  const [isVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => setIsResending(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base via-surface-sunken to-surface-elevated flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="surface-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-text-primary">
              {isVerified ? "Email Verified!" : "Verify your email"}
            </CardTitle>
            <CardDescription className="text-text-secondary">
              {isVerified 
                ? "Your email has been successfully verified. You can now access all features."
                : "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isVerified ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-states-success/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-states-success" />
                </div>
                <Link to="/dashboard">
                  <Button className="w-full btn-primary">
                    Continue to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-brand-primary" />
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Didn't receive the email? Check your spam folder or click the button below to resend.
                  </p>
                </div>

                <Button 
                  onClick={handleResend}
                  disabled={isResending}
                  variant="outline" 
                  className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated"
                >
                  {isResending ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/login">
                    <Button variant="ghost" className="text-text-secondary hover:text-text-primary">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}