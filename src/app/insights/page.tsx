// src/app/insights/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  getAiPoweredInsights,
  GetAiPoweredInsightsOutput,
} from '@/ai/flows/get-ai-powered-insights';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Activity, Target, CheckCircle, BrainCircuit, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AppHeader from '@/components/layout/header';
import AppNavbar from '@/components/layout/navbar';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const formSchema = z.object({
  organizationalData: z.string().min(1, 'Organizational data is required.'),
});

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

export default function InsightsPage() {
  const { t } = useTranslation();
  const [insights, setInsights] = useState<GetAiPoweredInsightsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const insightsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationalData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await getAiPoweredInsights(values);
      setInsights(result);
    } catch (error) {
      console.error('Error generating insights:', error);
      // Optionally, show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownloadPdf = async () => {
    const element = insightsRef.current;
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

        pdf.save('synapse-insights.pdf');
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
              <CardTitle>{t("Collective Intelligence")}</CardTitle>
              <CardDescription>
                {t("Surface insights from the ground up by analyzing feedback, ideas, and patterns across teams.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="organizationalData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Organizational Data")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., - Quarterly Sales Report (Q2 2024): Revenue up 15% YoY, but profit margin decreased by 2% due to increased marketing spend.\n- Team Performance Metrics: Engineering velocity is 20 points/sprint. Support ticket resolution time is averaging 48 hours.\n- Market Analysis: Competitor X launched a new feature that is gaining traction. Customer feedback suggests a desire for better mobile integration.")}
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("Generate Insights")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="space-y-6" ref={insightsRef}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div >
                  <CardTitle>{t("Generated Insights & Recommendations")}</CardTitle>
                </div>
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
                {insights ? (
                  <div className="prose dark:prose-invert max-w-none space-y-4">
                    <div>
                      <h3 className="font-semibold">{t("Insights")}</h3>
                      <p>{insights.insights}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">{t("Recommendations")}</h3>
                      <p>{insights.recommendations}</p>
                    </div>
                  </div>
                ) : (
                  !isLoading && (
                    <p className="text-muted-foreground">
                      {t("Your generated insights will appear here.")}
                    </p>
                  )
                )}
              </CardContent>
            </Card>
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
          </div>
        </div>
      </main>
    </div>
  );
}
