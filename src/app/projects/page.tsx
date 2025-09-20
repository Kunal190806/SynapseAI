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
import { Filter, Download } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";
import { useTranslation } from "react-i18next";
import '@/lib/i18n';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

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

  const handleDownloadPdf = () => {
    const input = projectsRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pdfWidth;
      const height = canvasHeight / ratio;

      let position = 0;
      let heightLeft = height;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, height);
      heightLeft -= pdfHeight;
      
      while (heightLeft >= 0) {
          position = heightLeft - height;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, height);
          heightLeft -= pdfHeight;
      }
      
      pdf.save("synapse-projects.pdf");
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Card ref={projectsRef}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>{t("Projects")}</CardTitle>
                    <CardDescription>
                    {t("Display of all active projects, their status, and progress towards strategic goals.")}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden sm:flex">
                        <Filter className="mr-2 h-4 w-4" />
                        {t("Filter Projects")}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownloadPdf}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
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
          </Card>
        </div>
      </main>
    </div>
  );
}
