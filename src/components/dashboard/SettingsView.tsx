import { useState } from "react";
import { useThemeStyles } from "../ThemeProvider";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import  Label  from "../ui/label";
import  Switch  from "../ui/switch";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  User,
  Bell,
  Lock,
  Palette,
  Database,
  Shield,
  Save,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";

export function SettingsView() {
  const styles = useThemeStyles();

  // Get preferences from localStorage
  const savedPreferences = JSON.parse(
    localStorage.getItem("echoboard-preferences") || "{}"
  );
  const savedProfile = JSON.parse(
    localStorage.getItem("echoboard-profile") || "{}"
  );

  const [preferences, setPreferences] = useState({
    emailNotifications: savedPreferences.emailNotifications ?? true,
    pushNotifications: savedPreferences.pushNotifications ?? false,
    publicProfile: savedPreferences.publicProfile ?? true,
    showInDirectory: savedPreferences.showInDirectory ?? true,
    messageRequests: true,
    tagging: true,
  });

  const [profile, setProfile] = useState({
    name: savedProfile.name || "",
    email: savedProfile.email || "",
    bio: savedProfile.bio || "",
  });

  const handleSavePreferences = () => {
    localStorage.setItem("echoboard-preferences", JSON.stringify(preferences));
    alert("Settings saved successfully!");
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...savedProfile,
      ...profile,
    };
    localStorage.setItem("echoboard-profile", JSON.stringify(updatedProfile));
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full lg:w-auto">
          <TabsTrigger value="account" className="flex-1 lg:flex-none gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 lg:flex-none gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1 lg:flex-none gap-2">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1 lg:flex-none gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-6 ${styles.shadow.card}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Account Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {profile.bio.length}/160 characters
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your password and authentication settings
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className={`gap-2 ${styles.shadow.button}`}>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-6 ${styles.shadow.card}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Choose how you want to be notified
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="email-notif">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notif"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="push-notif">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        id="push-notif"
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            pushNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="message-requests">Message Requests</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get notified of new message requests
                        </p>
                      </div>
                      <Switch
                        id="message-requests"
                        checked={preferences.messageRequests}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            messageRequests: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences} className={`gap-2 ${styles.shadow.button}`}>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-6 ${styles.shadow.card}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">Privacy & Security</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Control who can see your content and interact with you
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Make your profile visible to everyone
                        </p>
                      </div>
                      <Switch
                        id="public-profile"
                        checked={preferences.publicProfile}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            publicProfile: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="show-directory">Show in Directory</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Appear in the community member directory
                        </p>
                      </div>
                      <Switch
                        id="show-directory"
                        checked={preferences.showInDirectory}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            showInDirectory: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <Label htmlFor="tagging">Allow Tagging</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Let others tag you in posts and comments
                        </p>
                      </div>
                      <Switch
                        id="tagging"
                        checked={preferences.tagging}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            tagging: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className={`p-4 rounded-lg border ${styles.tw("border-amber-200 bg-amber-50", "border-amber-800 bg-amber-900/20")}`}>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm mb-1">
                        <strong>Privacy Notice:</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your privacy is important to us. We'll never share your
                        personal information without your explicit consent.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences} className={`gap-2 ${styles.shadow.button}`}>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-6 ${styles.shadow.card}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-2">Appearance</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Customize how EchoBoard looks for you
                  </p>

                  <div className={`p-4 rounded-lg border ${styles.tw("border-sky-200 bg-sky-50", "border-sky-800 bg-sky-900/20")}`}>
                    <div className="flex items-start gap-3">
                      <Palette className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">
                          <strong>Theme:</strong>
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your theme preference is automatically saved. Use the theme
                          toggle in the sidebar to switch between light and dark mode.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current theme: <strong>{styles.theme}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg mb-2">Data Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your account data
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="gap-2">
                      <Database className="w-4 h-4" />
                      Download Your Data
                    </Button>
                    <Button
                      variant="destructive"
                      className="gap-2"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete your account? This action cannot be undone."
                          )
                        ) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
