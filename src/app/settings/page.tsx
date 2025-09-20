// src/app/settings/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t("Settings")}</CardTitle>
              <CardDescription>
                {t("Manage your account settings and preferences.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Profile Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t("Profile")}</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">{t("Name")}</Label>
                  <Input id="name" defaultValue="Synapse User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("Email")}</Label>
                  <Input id="email" type="email" defaultValue="user@synapse.ai" />
                </div>
                <Button>{t("Update Profile")}</Button>
              </div>

              <Separator />

              {/* Notification Settings */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t("Notifications")}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">{t("Email Notifications")}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t("Receive email updates about project milestones and mentions.")}
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="in-app-notifications">{t("In-App Notifications")}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t("Show notifications within the SynapseAI application.")}
                    </p>
                  </div>
                  <Switch id="in-app-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
