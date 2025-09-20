'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Activity, Target, CheckCircle, BrainCircuit } from 'lucide-react';
import { useState } from "react";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';

const dashboardData = {
  overallAlignment: "92%",
  activeProjects: "12",
  tasksCompleted: "348",
  narrativeStrength: "8.5/10",
  recentActivities: [
    { project: "Project Phoenix", task: "Deploy to staging", status: "Completed" },
    { project: "QuantumLeap", task: "User feedback session", status: "In Progress" },
  ],
};

export default function SimulationPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const handleStartSimulation = () => {
    setIsLoading(true);
    setSimulationResult(null);
    // Simulate an API call
    setTimeout(() => {
      setSimulationResult(t("Simulation complete. The simulation predicts a 15% increase in project completion efficiency by reallocating resources from Project Nova to Project Phoenix. Potential risks include a 5% budget overrun but a 10% faster time-to-market."));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Decision Simulation Sandbox")}</CardTitle>
              <CardDescription>
                {t('Run "what-if" scenarios to project outcomes on timelines, budgets, and goals before making key decisions.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("Dashboard Data")}</CardTitle>
                    <CardDescription>
                      {t("Live data from the main dashboard for context.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2"><Target className="w-4 h-4 text-muted-foreground" /> {t("Purpose Alignment")}: <strong>{dashboardData.overallAlignment}</strong></div>
                        <div className="flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-muted-foreground" /> {t("Active Projects")}: <strong>{dashboardData.activeProjects}</strong></div>
                        <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-muted-foreground" /> {t("Tasks Completed")}: <strong>{dashboardData.tasksCompleted}</strong></div>
                        <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-muted-foreground" /> {t("Narrative Strength")}: <strong>{dashboardData.narrativeStrength}</strong></div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{t("Recent Activities")}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {dashboardData.recentActivities.map((activity, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{t(activity.project)}: {t(activity.task)}</span>
                              <span className="font-medium">{t(activity.status)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </CardContent>
                </Card>
                <p>{t("Press the button below to start a simulation based on the current dashboard data.")}</p>
                <Button onClick={handleStartSimulation} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("Start Simulation")}
                </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("Simulation Outcome")}</CardTitle>
            </CardHeader>
            <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {simulationResult ? (
              <div className="prose dark:prose-invert">
                <p>{simulationResult}</p>
              </div>
            ) : (
              !isLoading && (
                <p className="text-muted-foreground">
                  {t("Your simulation results will appear here.")}
                </p>
              )
            )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
