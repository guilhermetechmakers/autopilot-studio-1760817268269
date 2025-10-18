import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Users } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">Manage your account and workspace preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center">
                <User className="w-5 h-5 mr-2 text-brand-primary" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Your Company" />
              </div>
              <Button className="btn-primary">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center">
                <Bell className="w-5 h-5 mr-2 text-brand-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-primary">Email Notifications</div>
                  <div className="text-sm text-text-secondary">Receive email updates about your projects</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-primary">Push Notifications</div>
                  <div className="text-sm text-text-secondary">Get real-time updates in your browser</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-primary">Weekly Reports</div>
                  <div className="text-sm text-text-secondary">Receive weekly project summaries</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center">
                <Shield className="w-5 h-5 mr-2 text-brand-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="btn-primary">Update Password</Button>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary flex items-center">
                <Users className="w-5 h-5 mr-2 text-brand-primary" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="font-medium text-text-primary mb-2">Invite Team Members</h3>
                <p className="text-text-secondary mb-4">Add team members to collaborate on projects</p>
                <Button variant="outline" className="border-borders-strong text-text-primary hover:bg-surface-elevated">
                  Invite Members
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}