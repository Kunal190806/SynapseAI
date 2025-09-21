// src/app/passive-agents/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Power, PowerOff, RefreshCw } from "lucide-react";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';

const agents = [
  {
    name: "Risk Monitoring Agent",
    description: "Continuously analyzes project data to identify potential risks and delays before they impact timelines.",
    status: "Active",
  },
  {
    name: "Weekly Digest Agent",
    description: "Generates a weekly summary of project progress, key achievements, and alignment scores for leadership.",
    status: "Idle",
  },
  {
    name: "Opportunity Scout Agent",
    description: "Scans customer feedback and market trends to identify new feature opportunities or strategic pivots.",
    status: "Active",
  },
  {
    name: "Resource Allocation Agent",
    description: "Suggests optimal resource re-allocations based on project priorities, team workload, and skill sets.",
    status: "Paused",
  },
  {
    name: "Onboarding Buddy Agent",
    description: "Assists new team members by providing them with relevant documentation, project context, and key contacts.",
    status: "Active",
  },
];

const getStatusVariant = (status: string): "success" | "warning" | "secondary" => {
    switch (status) {
      case "Active":
        return "success";
      case "Paused":
        return "warning";
      case "Idle":
        return "secondary";
      default:
        return "secondary";
    }
  };

export default function PassiveAgentsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Passive Agents")}</CardTitle>
              <CardDescription>
                {t("Monitor the status and activity of your autonomous agents.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => (
                <Card key={agent.name}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{t(agent.name)}</CardTitle>
                    </div>
                    <Badge variant={getStatusVariant(agent.status)}>{t(agent.status)}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm min-h-[60px]">{t(agent.description)}</p>
                    <div className="flex gap-2">
                        {agent.status === 'Active' || agent.status === 'Idle' ? (
                            <Button variant="outline" size="sm">
                                <PowerOff className="mr-2 h-4 w-4" /> {t("Deactivate")}
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm">
                                <Power className="mr-2 h-4 w-4" /> {t("Activate")}
                            </Button>
                        )}
                         <Button variant="ghost" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" /> {t("Refresh")}
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}