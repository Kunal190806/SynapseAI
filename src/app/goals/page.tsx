// src/app/goals/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Zap, Rocket, Handshake, TrendingUp, Users, Heart, Globe, Lightbulb, Download, TestTube } from "lucide-react";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


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

const strategicGoals = [
  {
    id: "goal-1",
    title: "Increase Annual Recurring Revenue by 20%",
    icon: Rocket,
    progress: 75,
    projects: [
      { name: "Project Phoenix", alignment: "High", status: "On Track" },
      { name: "QuantumLeap", alignment: "High", status: "In Progress" },
      { name: "Apollo", alignment: "Medium", status: "In Progress" },
      { name: "Project Titan", alignment: "High", status: "On Track" },
    ],
  },
  {
    id: "goal-2",
    title: "Improve Customer Satisfaction by 15%",
    icon: Users,
    progress: 50,
    projects: [
      { name: "QuantumLeap", alignment: "Medium", status: "In Progress" },
      { name: "Project Nova", alignment: "Low", status: "On Hold" },
      { name: "Customer Voice", alignment: "High", status: "On Track" },
    ],
  },
  {
    id: "goal-3",
    title: "Enhance Operational Efficiency by 30%",
    icon: Zap,
    progress: 60,
    projects: [
      { name: "Orion", alignment: "High", status: "At Risk" },
      { name: "Helios", alignment: "Medium", status: "Delayed" },
      { name: "AutomateIt", alignment: "High", status: "Completed" },
    ],
  },
  {
    id: "goal-4",
    title: "Expand into New European Market",
    icon: TrendingUp,
    progress: 30,
    projects: [
      { name: "Market Entry Alpha", alignment: "High", status: "In Progress" },
      { name: "Compliance Framework", alignment: "High", status: "At Risk" },
      { name: "Localization Initiative", alignment: "Medium", status: "On Track" },
    ],
  },
  {
    id: "goal-5",
    title: "Strengthen Strategic Partnerships",
    icon: Handshake,
    progress: 85,
    projects: [
      { name: "Partner API Integration", alignment: "High", status: "On Track" },
      { name: "Co-Marketing Campaign", alignment: "Medium", status: "Completed" },
    ],
  },
];

const purposeGoals = [
    {
      id: "purpose-1",
      title: "Foster a Culture of Innovation",
      icon: Lightbulb,
      description: "Encourage experimentation and creative problem-solving at all levels.",
      projects: [
        { name: "Innovation Guild", status: "On Track" },
        { name: "Internal Hackathon '24", status: "Completed" },
        { name: "Blue Sky Ideation Board", status: "In Progress" },
      ]
    },
    {
        id: "purpose-2",
        title: "Commit to Sustainable Practices",
        icon: Globe,
        description: "Reduce our environmental footprint and promote ecological responsibility.",
        projects: [
          { name: "Carbon Neutral Initiative", status: "In Progress" },
          { name: "Supplier Sustainability Audit", status: "On Track" },
          { name: "Green Commute Program", status: "Completed" },
        ]
      },
      {
        id: "purpose-3",
        title: "Champion Customer-Centricity",
        icon: Heart,
        description: "Place the customer at the heart of every decision we make.",
        projects: [
          { name: "Customer Voice Program", status: "On Track" },
          { name: "CX Journey Mapping", status: "Completed" },
          { name: "NPS Improvement Initiative", status: "In Progress" },
        ]
      }
]

export default function GoalsPage() {
  const { t } = useTranslation();
  const goalsRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = goalsRef.current;
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

        pdf.save('synapse-goals.pdf');
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
        <div className="flex flex-col gap-6">
          <Card>
            <div ref={goalsRef} className="p-6 pt-0">
              <CardHeader className="pl-0 flex flex-row items-center justify-between">
                  <div>
                      <CardTitle>{t("Purpose & Goals")}</CardTitle>
                      <CardDescription>
                          {t("Evaluate every action against both strategic goals and organizational values to ensure every action has a purpose.")}
                      </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button id="simulation-button" variant="outline" size="sm">
                          <TestTube className="h-4 w-4 mr-2" />
                          {t("Run Simulation")}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Simulation Complete</AlertDialogTitle>
                          <AlertDialogDescription>
                            Simulating a 10% budget reallocation from "Enhance Operational Efficiency" to "Increase ARR" projects suggests a potential 5% uplift in Q4 revenue, but it may delay the "Orion" project by 3 weeks, increasing its risk profile.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Acknowledge</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button id="download-button" variant="outline" size="icon" onClick={handleDownloadPdf}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                    </Button>
                  </div>
              </CardHeader>
              <CardContent className="space-y-8 pl-0">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("Strategic Goals")}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {strategicGoals.map((goal) => (
                      <AccordionItem value={goal.id} key={goal.id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-4 w-full">
                            <goal.icon className="h-6 w-6 text-primary" />
                            <div className="flex-1 text-left">
                              <p className="font-semibold">{t(goal.title)}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={goal.progress} className="w-full max-w-xs h-2" />
                                <span className="text-sm font-medium text-muted-foreground">{goal.progress}%</span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-10">
                            <h4 className="font-semibold mb-2 text-muted-foreground">{t("Aligned Projects:")}</h4>
                            <ul className="space-y-2">
                              {goal.projects.map((project, index) => (
                                <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-md bg-muted/50 gap-2">
                                  <span className="font-medium">{t(project.name)}</span>
                                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                    <Badge variant="outline">{t("Alignment")}: {t(project.alignment)}</Badge>
                                    <Badge variant={getStatusVariant(project.status)}>{t(project.status)}</Badge>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("Core Values & Mission")}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {purposeGoals.map((goal) => (
                      <Card key={goal.id}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                              <goal.icon className="h-7 w-7 text-accent" />
                              <CardTitle className="text-lg">{t(goal.title)}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{t(goal.description)}</p>
                          <h4 className="font-semibold mb-2 text-sm">{t("Supporting Initiatives:")}</h4>
                          <ul className="space-y-2">
                            {goal.projects.map((project, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span className="font-medium">{t(project.name)}</span>
                                <Badge variant={getStatusVariant(project.status)}>{t(project.status)}</Badge>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
