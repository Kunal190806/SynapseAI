// src/app/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatCard from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AlignmentChart from "@/components/dashboard/alignment-chart";
import ProgressChart from "@/components/dashboard/progress-chart";
import TaskDistributionChart from "@/components/dashboard/task-distribution-chart";
import { Activity, Target, CheckCircle, BrainCircuit, Download, TestTube, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AgentAlert from "@/components/dashboard/agent-alert";

const recentActivities = [
    { project: "Project Phoenix", task: "Deploy to staging", status: "Completed", user: "Alice" },
    { project: "QuantumLeap", task: "User feedback session", status: "In Progress", user: "Bob" },
    { project: "Project Nova", task: "Initial design mockups", status: "On Hold", user: "Charlie" },
    { project: "Orion", task: "Fix critical API bug", status: "At Risk", user: "David" },
    { project: "Helios", task: "Finalize Q4 budget", status: "Delayed", user: "Eve" },
    { project: "Customer Voice", task: "Analyze survey results", status: "On Track", user: "Frank" },
    { project: "AutomateIt", task: "Onboard new team members", status: "Completed", user: "Grace" },
];

const agentAlerts = [
    {
      title: "Goal At Risk: Enhance Operational Efficiency",
      description: "Project Orion's 'At Risk' status for over 2 weeks is jeopardizing the 'Enhance Operational Efficiency' goal. The project is blocked by a critical API bug.",
      suggestion: "Reallocate one senior developer from 'Project Phoenix' (currently ahead of schedule) to assist the 'Orion' team for a 1-week sprint. This is projected to unblock the API issue and bring 'Orion' back on track."
    },
    {
        title: "Opportunity Detected: Improve Customer Satisfaction",
        description: "The 'Customer Voice' project has identified a high-impact, low-effort feature request that aligns with the 'Improve Customer Satisfaction' goal.",
        suggestion: "Create a new micro-project to implement the 'One-Click Report Export' feature. This can be staffed by a junior developer and is forecasted to increase the Customer Satisfaction score by 2% with minimal resource impact."
    }
]

const getStatusVariant = (status: string): "success" | "warning" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case "On Track":
        return "success";
      case "Completed":
        return "success";
      case "At Risk":
        return "warning";
      case "Delayed":
        return "destructive";
      case "In Progress":
        return "secondary";
      case "On Hold":
        return "outline";
      default:
        return "outline";
    }
  };

export default function DashboardPage() {
  const { t } = useTranslation();
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = dashboardRef.current;
    if (!element) return;

    const clone = element.cloneNode(true) as HTMLElement;
    
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = '1024px';
    pdfContainer.classList.add('light'); 
    pdfContainer.appendChild(clone);
    document.body.appendChild(pdfContainer);

    const downloadButton = clone.querySelector('#download-button') as HTMLElement;
    if (downloadButton) downloadButton.style.display = 'none';
    const simButton = clone.querySelector('#simulation-button') as HTMLElement;
    if (simButton) simButton.style.display = 'none';

    try {
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let imgHeight = pdfWidth / ratio;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = -heightLeft;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('synapse-dashboard.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        document.body.removeChild(pdfContainer);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex justify-end gap-2 mb-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button id="simulation-button" variant="outline" size="sm">
                  <TestTube className="h-4 w-4 mr-2" />
                  {t("Run Scenario")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Simulation Complete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Based on current dashboard data, shifting 10% of the budget from 'Enhance Operational Efficiency' to 'Increase ARR' projects is projected to increase overall revenue by 3% in the next quarter. This may slightly delay the 'AutomateIt' project by 2 weeks but is expected to yield a higher ROI.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Acknowledge</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button id="download-button" variant="outline" size="sm" onClick={handleDownloadPdf}>
                <Download className="h-4 w-4 mr-2" />
                {t("Download PDF")}
            </Button>
        </div>
        <div className="flex flex-col gap-6" ref={dashboardRef}>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center text-lg gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Agent Alerts</span>
                </CardTitle>
                <CardDescription>
                    Proactive risks and opportunities identified by SynapseAI.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {agentAlerts.map((alert, index) => (
                    <AgentAlert key={index} title={alert.title} description={alert.description} suggestion={alert.suggestion} />
                ))}
            </CardContent>
          </Card>
            
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title={t("Purpose Alignment")}
              value="92%"
              icon={Target}
              description={t("+5% from last month")}
              footer={<Progress value={92} className="h-2" />}
            />
            <StatCard
              title={t("Active Projects")}
              value="12"
              icon={BrainCircuit}
              description={t("3 new this week")}
            />
            <StatCard
              title={t("Tasks Completed")}
              value="348"
              icon={CheckCircle}
              description={t("+15% from last week")}
            />
            <StatCard
              title={t("Narrative Strength")}
              value="8.5/10"
              icon={Activity}
              description={t("Consistently strong")}
            />
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("Alignment Over Time")}</CardTitle>
                <CardDescription>
                  {t("How well operational tasks are aligning with strategic goals.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlignmentChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Project Progress")}</CardTitle>
                <CardDescription>
                  {t("Completion status of active projects.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("Recent Activity")}</CardTitle>
                <CardDescription>
                  {t("A log of the latest tasks and updates across all projects.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("Project")}</TableHead>
                      <TableHead className="hidden sm:table-cell">{t("Task")}</TableHead>
                      <TableHead className="text-right">{t("Status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{t(activity.project)}</TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">{t(activity.task)}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={getStatusVariant(activity.status)}>
                            {t(activity.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("Task Distribution")}</CardTitle>
                <CardDescription>
                  {t("Breakdown of tasks by strategic goal.")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskDistributionChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
