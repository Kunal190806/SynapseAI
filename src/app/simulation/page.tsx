'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Activity, Target, CheckCircle, BrainCircuit, Download, Sparkles } from 'lucide-react';
import { useState, useRef } from "react";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

const dummyResult = "Simulation complete. The simulation predicts a 15% increase in project completion efficiency by reallocating resources from Project Nova to Project Phoenix. Potential risks include a 5% budget overrun but a 10% faster time-to-market.";

export default function SimulationPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(dummyResult);
  const simulationRef = useRef<HTMLDivElement>(null);

  const handleStartSimulation = () => {
    setIsLoading(true);
    setSimulationResult(null);
    // Simulate an API call
    setTimeout(() => {
      setSimulationResult(t(dummyResult));
      setIsLoading(false);
    }, 2000);
  };
  
  const onGenerateDummy = () => {
    setIsLoading(false);
    setSimulationResult(t(dummyResult));
  }

  const handleDownloadPdf = async () => {
    const element = simulationRef.current;
    if (!element) return;

    // Clone the element to modify it for PDF generation without affecting the live view
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Create a container and apply a light theme for PDF generation
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = '1024px'; 
    pdfContainer.classList.add('light'); 
    pdfContainer.appendChild(clone);
    document.body.appendChild(pdfContainer);

    // Temporarily hide the download button in the cloned element
    const downloadButton = clone.querySelector('#download-button') as HTMLElement;
    if (downloadButton) downloadButton.style.display = 'none';

    try {
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff', // Force white background
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

        pdf.save('synapse-simulation.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        // Clean up by removing the container from the body
        document.body.removeChild(pdfContainer);
    }
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
                <div className="flex gap-2">
                    <Button onClick={handleStartSimulation} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t("Start Simulation")}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onGenerateDummy}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t("Generate Dummy Data")}
                    </Button>
                </div>
            </CardContent>
          </Card>
          <Card ref={simulationRef}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("Simulation Outcome")}</CardTitle>
              <Button id="download-button" variant="outline" size="icon" onClick={handleDownloadPdf}>
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download PDF</span>
              </Button>
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
