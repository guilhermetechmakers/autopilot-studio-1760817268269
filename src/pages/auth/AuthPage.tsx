import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from "@/lib/validations/auth";
import { 
  Bot, 
  Github, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Building, 
  Globe, 
  HelpCircle, 
  Shield,
  CheckCircle
} from "lucide-react";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const location = useLocation();
  
  const { login, signup, socialLogin, ssoLogin, isLoading } = useAuth();

  // Set initial mode based on route
  useEffect(() => {
    if (location.pathname === "/signup") {
      setAuthMode("signup");
    } else {
      setAuthMode("login");
    }
  }, [location.pathname]);

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      role: "",
      password: "",
      acceptTerms: false,
    },
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  const handleSignupSubmit = async (data: SignupFormData) => {
    await signup(data);
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    // In a real app, this would redirect to the OAuth provider
    // For now, we'll simulate the OAuth flow
    const mockCode = `mock_${provider}_code_${Date.now()}`;
    await socialLogin({ provider, code: mockCode });
  };

  const handleSSOLogin = async () => {
    await ssoLogin("saml");
  };

  const handleGuestIntake = () => {
    // Navigate to intake booking
    window.location.href = "/intake";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-base via-surface-sunken to-surface-elevated">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">Autopilot Studio</span>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-20 h-9 bg-surface-elevated border-borders-strong text-text-primary">
                <Globe className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="de">DE</SelectItem>
              </SelectContent>
            </Select>

            {/* Support Link */}
            <Button variant="ghost" size="sm" className="text-text-secondary hover:text-text-primary">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-24">
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
                {authMode === "login" ? "Welcome back" : "Create your account"}
              </CardTitle>
              <CardDescription className="text-text-secondary">
                {authMode === "login" 
                  ? "Sign in to your Autopilot Studio account" 
                  : "Get started with Autopilot Studio today"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 bg-surface-elevated">
                  <TabsTrigger value="login" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-text-primary">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-states-danger">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-text-primary">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...loginForm.register("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-text-muted" />
                          ) : (
                            <Eye className="w-4 h-4 text-text-muted" />
                          )}
                        </Button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-states-danger">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={loginForm.watch("rememberMe")}
                          onCheckedChange={(checked) => loginForm.setValue("rememberMe", checked === true)}
                        />
                        <Label htmlFor="remember" className="text-sm text-text-secondary">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        to="/password-reset"
                        className="text-sm text-brand-primary hover:text-brand-hover transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-text-primary">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          {...signupForm.register("firstName")}
                        />
                        {signupForm.formState.errors.firstName && (
                          <p className="text-sm text-states-danger">{signupForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-text-primary">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          {...signupForm.register("lastName")}
                        />
                        {signupForm.formState.errors.lastName && (
                          <p className="text-sm text-states-danger">{signupForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-text-primary">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          {...signupForm.register("email")}
                        />
                      </div>
                      {signupForm.formState.errors.email && (
                        <p className="text-sm text-states-danger">{signupForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-text-primary">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your Company"
                          className="pl-10"
                          {...signupForm.register("company")}
                        />
                      </div>
                      {signupForm.formState.errors.company && (
                        <p className="text-sm text-states-danger">{signupForm.formState.errors.company.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-text-primary">Role</Label>
                      <Select onValueChange={(value) => signupForm.setValue("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="founder">Founder/CEO</SelectItem>
                          <SelectItem value="project-manager">Project Manager</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="qa">QA Engineer</SelectItem>
                          <SelectItem value="sales">Sales/Business Development</SelectItem>
                          <SelectItem value="finance">Finance/Accounting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {signupForm.formState.errors.role && (
                        <p className="text-sm text-states-danger">{signupForm.formState.errors.role.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-text-primary">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-10 pr-10"
                          {...signupForm.register("password")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-text-muted" />
                          ) : (
                            <Eye className="w-4 h-4 text-text-muted" />
                          )}
                        </Button>
                      </div>
                      {signupForm.formState.errors.password && (
                        <p className="text-sm text-states-danger">{signupForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={signupForm.watch("acceptTerms")}
                          onCheckedChange={(checked) => signupForm.setValue("acceptTerms", checked === true)}
                        />
                        <Label htmlFor="terms" className="text-sm text-text-secondary leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms-of-service" className="text-brand-primary hover:text-brand-hover">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy-policy" className="text-brand-primary hover:text-brand-hover">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      {signupForm.formState.errors.acceptTerms && (
                        <p className="text-sm text-states-danger">{signupForm.formState.errors.acceptTerms.message}</p>
                      )}

                      <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              {/* SSO Option */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated"
                  onClick={handleSSOLogin}
                  disabled={isLoading}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Continue with SSO
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-text-muted">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isLoading}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>

              {/* Security Notices */}
              <Alert className="border-borders-strong bg-surface-elevated">
                <Shield className="h-4 w-4 text-brand-primary" />
                <AlertDescription className="text-text-secondary">
                  <strong className="text-text-primary">Security Notice:</strong> Enable 2FA in your account settings for enhanced security. 
                  <Link to="/settings" className="text-brand-primary hover:text-brand-hover ml-1">
                    Learn more
                  </Link>
                </AlertDescription>
              </Alert>

              {/* Email Verification Notice */}
              <Alert className="border-states-info/20 bg-states-info/5">
                <CheckCircle className="h-4 w-4 text-states-info" />
                <AlertDescription className="text-text-secondary">
                  <strong className="text-text-primary">Email Verification:</strong> Check your email for verification instructions after signup.
                  <Link to="/email-verification" className="text-brand-primary hover:text-brand-hover ml-1">
                    Resend verification
                  </Link>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Guest Intake CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <Card className="surface-card border-brand-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text-primary mb-2">
                  New to Autopilot Studio?
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Book a free AI intake session to see how we can help your agency automate your entire service pipeline
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  onClick={handleGuestIntake}
                >
                  Book AI Intake
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}