'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Activity, Target, CheckCircle, BrainCircuit } from 'lucide-react';
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";

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
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const handleStartSimulation = () => {
    setIsLoading(true);
    setSimulationResult(null);
    // Simulate an API call
    setTimeout(() => {
      setSimulationResult("Simulation complete. The simulation predicts a 15% increase in project completion efficiency by reallocating resources from Project Nova to Project Phoenix. Potential risks include a 5% budget overrun but a 10% faster time-to-market.");
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
              <CardTitle>Decision Simulation Sandbox</CardTitle>
              <CardDescription>
                Run "what-if" scenarios to project outcomes on timelines, budgets, and goals before making key decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Data</CardTitle>
                    <CardDescription>
                      Live data from the main dashboard for context.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2"><Target className="w-4 h-4 text-muted-foreground" /> Overall Alignment: <strong>{dashboardData.overallAlignment}</strong></div>
                        <div className="flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-muted-foreground" /> Active Projects: <strong>{dashboardData.activeProjects}</strong></div>
                        <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-muted-foreground" /> Tasks Completed: <strong>{dashboardData.tasksCompleted}</strong></div>
                        <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-muted-foreground" /> Narrative Strength: <strong>{dashboardData.narrativeStrength}</strong></div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Recent Activities</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {dashboardData.recentActivities.map((activity, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{activity.project}: {activity.task}</span>
                              <span className="font-medium">{activity.status}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                  </CardContent>
                </Card>
                <p>Press the button below to start a simulation based on the current dashboard data.</p>
                <Button onClick={handleStartSimulation} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Start Simulation
                </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Simulation Outcome</CardTitle>
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
                  Your simulation results will appear here.
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
