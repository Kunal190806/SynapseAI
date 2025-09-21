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
import { Loader2, Activity, Target, CheckCircle, BrainCircuit, Download, Sparkles, PlusSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AppHeader from '@/components/layout/header';
import AppNavbar from '@/components/layout/navbar';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

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

const dummyInsights: GetAiPoweredInsightsOutput = {
    insights: "1. Revenue Growth vs. Margin: While revenue is up 15% YoY, the 2% decrease in profit margin indicates that the cost of acquisition (increased marketing spend) is outpacing growth. This trend could impact long-term profitability.\n2. Engineering/Support Imbalance: Engineering velocity is stable, but the 48-hour support ticket resolution time suggests a potential bottleneck in customer support or product quality issues that lead to more tickets.\n3. Market Opportunity: The market's positive reception to Competitor X's new feature, coupled with customer feedback desiring better mobile integration, signals a clear product development opportunity.",
    recommendations: "1. Optimize Marketing Spend: Re-evaluate marketing channel ROI. Shift budget from high-cost, low-conversion channels to more efficient ones. A/B test new messaging focused on value rather than just features to potentially lower acquisition costs.\n2. Support Team Triage Process: Implement a stricter triage process for support tickets to prioritize critical issues. Dedicate a portion of engineering time (e.g., 10%) to address the root causes of common support tickets, reducing the overall volume.\n3. Fast-Track Mobile Integration: Create a dedicated task force to scope and prototype a mobile integration feature. Allocate resources from a lower-priority project to accelerate development and capitalize on the identified market demand before competitors."
};


export default function InsightsPage() {
  const { t } = useTranslation();
  const [insights, setInsights] = useState<GetAiPoweredInsightsOutput | null>(
    dummyInsights
  );
  const [isLoading, setIsLoading] = useState(false);
  const insightsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddShortcut = () => {
    toast({
      title: "Shortcut Added",
      description: `${t('Collective Intelligence')} has been added to your shortcuts.`,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationalData: "- Quarterly Sales Report (Q2 2024): Revenue up 15% YoY, but profit margin decreased by 2% due to increased marketing spend.\n- Team Performance Metrics: Engineering velocity is 20 points/sprint. Support ticket resolution time is averaging 48 hours.\n- Market Analysis: Competitor X launched a new feature that is gaining traction. Customer feedback suggests a desire for better mobile integration.",
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

  const onGenerateDummy = () => {
    setIsLoading(false);
    setInsights(dummyInsights);
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
                  <div className="flex gap-2 flex-wrap">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {t("Generate Insights")}
                    </Button>
                    <Button type="button" variant="secondary" onClick={onGenerateDummy}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {t("Generate Dummy Data")}
                    </Button>
                  </div>
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
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleAddShortcut}>
                        <PlusSquare className="h-4 w-4 mr-2" />
                        {t('Add Shortcut')}
                    </Button>
                    <Button id="download-button" variant="outline" size="icon" onClick={handleDownloadPdf}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                    </Button>
                </div>
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
                      <p className="whitespace-pre-line">{insights.insights}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold">{t("Recommendations")}</h3>
                      <p className="whitespace-pre-line">{insights.recommendations}</p>
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
