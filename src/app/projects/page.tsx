// src/app/projects/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Filter, Download, TestTube } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const projects = [
  {
    name: "Project Phoenix",
    status: "On Track",
    progress: 95,
    strategicGoal: "Increase ARR",
    alignment: "High",
  },
  {
    name: "QuantumLeap",
    status: "In Progress",
    progress: 78,
    strategicGoal: "Increase ARR",
    alignment: "High",
  },
  {
    name: "Project Nova",
    status: "On Hold",
    progress: 45,
    strategicGoal: "Improve Customer Satisfaction",
    alignment: "Low",
  },
  {
    name: "Orion",
    status: "At Risk",
    progress: 60,
    strategicGoal: "Enhance Operational Efficiency",
    alignment: "High",
  },
  {
    name: "Helios",
    status: "Delayed",
    progress: 25,
    strategicGoal: "Enhance Operational Efficiency",
    alignment: "Medium",
  },
  {
    name: "Vega",
    status: "Completed",
    progress: 100,
    strategicGoal: "Improve Customer Satisfaction",
    alignment: "Medium",
  },
  {
    name: "Apollo",
    status: "In Progress",
    progress: 50,
    strategicGoal: "Increase ARR",
    alignment: "Medium",
  },
  {
    name: "Customer Voice",
    status: "On Track",
    progress: 80,
    strategicGoal: "Improve Customer Satisfaction",
    alignment: "High",
  },
  {
    name: "AutomateIt",
    status: "Completed",
    progress: 100,
    strategicGoal: "Enhance Operational Efficiency",
    alignment: "High",
  },
  {
    name: "Market Entry Alpha",
    status: "In Progress",
    progress: 30,
    strategicGoal: "Expand into New European Market",
    alignment: "High",
  },
  {
    name: "Compliance Framework",
    status: "At Risk",
    progress: 15,
    strategicGoal: "Expand into New European Market",
    alignment: "High",
  },
  {
    name: "Partner API Integration",
    status: "On Track",
    progress: 90,
    strategicGoal: "Strengthen Strategic Partnerships",
    alignment: "High",
  },
  {
    name: "Co-Marketing Campaign",
    status: "Completed",
    progress: 100,
    strategicGoal: "Strengthen Strategic Partnerships",
    alignment: "Medium",
  },
  {
    name: "Project Titan",
    status: "On Track",
    progress: 85,
    strategicGoal: "Increase ARR",
    alignment: "High",
  },
  {
    name: "Localization Initiative",
    status: "On Track",
    progress: 40,
    strategicGoal: "Expand into New European Market",
    alignment: "Medium",
  }
];

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

export default function ProjectsPage() {
  const { t } = useTranslation();
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = projectsRef.current;
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
     const filterButton = clone.querySelector('#filter-button') as HTMLElement;
    if (filterButton) filterButton.style.display = 'none';
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

        pdf.save('synapse-projects.pdf');
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
             <div ref={projectsRef} className="p-6 pt-0">
                <CardHeader className="pl-0 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{t("Projects")}</CardTitle>
                        <CardDescription>
                        {t("Display of all active projects, their status, and progress towards strategic goals.")}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button id="simulation-button" variant="outline" size="sm">
                              <TestTube className="h-4 w-4 mr-2" />
                              {t("Simulate")}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Simulation Complete</AlertDialogTitle>
                              <AlertDialogDescription>
                                Pausing 'Project Nova' and reallocating its two developers to 'Orion' and 'Compliance Framework' could mitigate their 'At Risk' status. This simulation predicts 'Orion' will be back on track in 3 weeks, and 'Compliance' risk will be lowered, with only a minor impact on the 'Improve Customer Satisfaction' goal.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogAction>Acknowledge</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button id="filter-button" variant="outline" className="hidden sm:flex">
                            <Filter className="mr-2 h-4 w-4" />
                            {t("Filter Projects")}
                        </Button>
                        <Button id="download-button" variant="outline" size="icon" onClick={handleDownloadPdf}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download PDF</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pl-0">
                  <ScrollArea className="w-full whitespace-nowrap">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">{t("Project Name")}</TableHead>
                          <TableHead>{t("Status")}</TableHead>
                          <TableHead>{t("Progress")}</TableHead>
                          <TableHead className="hidden md:table-cell">{t("Strategic Goal")}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t("Alignment")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.name}>
                            <TableCell className="font-medium">{t(project.name)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusVariant(project.status)}
                              >
                                {t(project.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={project.progress} className="w-full max-w-[100px] h-2" />
                                <span className="text-muted-foreground text-sm">{project.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{t(project.strategicGoal)}</TableCell>
                            <TableCell className="text-right hidden sm:table-cell">{t(project.alignment)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
