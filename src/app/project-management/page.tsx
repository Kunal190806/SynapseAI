// src/app/project-management/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  adaptiveProjectManagement,
  AdaptiveProjectManagementOutput,
} from '@/ai/flows/adaptive-project-management';
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
import { Loader2, Download, Sparkles, PlusSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AppHeader from '@/components/layout/header';
import AppNavbar from '@/components/layout/navbar';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  projectDescription: z.string().min(1, 'Project description is required.'),
  teamStructures: z.string().min(1, 'Team structures are required.'),
  currentStatus: z.string().min(1, 'Current status is required.'),
  performanceData: z.string().min(1, 'Performance data is required.'),
});

const dummyResult: AdaptiveProjectManagementOutput = {
    recommendations: "1. Pair Programming for BE Devs: Pair BE Dev 1 with a senior developer to review PRs in real-time, reducing revision rounds and improving code quality.\n2. Task Re-allocation: Shift some of FE Dev 1's upcoming tasks to FE Dev 2 to balance workload and leverage their higher velocity, ensuring front-end work stays on schedule.\n3. Unblock Authentication Dependency: Escalate the authentication service dependency to the platform team lead, emphasizing its critical impact on the project timeline.",
    riskAssessment: "The primary risk is the back-end dependency on the authentication service, which has already caused a delay. Mitigation: Daily check-ins with the platform team. Secondary risk is BE Dev 1's performance bottleneck. Mitigation: Implement pair programming and provide additional mentorship.",
    performanceForecast: "With the proposed interventions, the project is forecasted to get back on track by the end of Sprint 4. The velocity is expected to increase to an average of 22 points. The one-week delay can be recovered, leading to an on-time launch.",
    strategicAlignment: "By addressing these issues, we ensure the 'Project Phoenix' initiative remains on schedule, directly supporting the strategic goal of increasing user activation rates by 20%. Timely launch is critical to realizing this Q4 objective."
};

export default function ProjectManagementPage() {
  const { t } = useTranslation();
  const [result, setResult] =
    useState<AdaptiveProjectManagementOutput | null>(dummyResult);
  const [isLoading, setIsLoading] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddShortcut = () => {
    toast({
      title: "Shortcut Added",
      description: `${t('Adaptive Management')} has been added to your shortcuts.`,
    });
  };


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: "Project Phoenix is a Q4 initiative to redesign our mobile application's user onboarding flow. The primary goal is to increase user activation rates by 20% within the first month of launch. The project involves UX/UI redesign, front-end and back-end development, and A/B testing.",
      teamStructures: "The project is led by a cross-functional team:\n- Core Pod (1 PM, 1 Designer, 2 FE Devs, 1 BE Dev).\n- QA Team (2 Testers).\n- Marketing (1 Product Marketing Manager for launch comms).\nThe Core Pod operates in 2-week sprints.",
      currentStatus: "Sprint 3 of 6 is complete. The new UI designs are finalized. Front-end development is 50% complete. A key back-end dependency on the new authentication service is blocked, causing a potential 1-week delay. The initial A/B test plan is drafted.",
      performanceData: "- Sprint 1 & 2 velocity: 18 points (target was 20).\n- BE Dev 1 has a high number of PR revisions, averaging 3 rounds per PR.\n- FE Dev 2 has completed 40% more tasks than FE Dev 1.\n- Current bug count: 5 critical, 12 non-critical.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await adaptiveProjectManagement(values);
      setResult(response);
    } catch (error) {
      console.error('Error generating project management insights:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const onGenerateDummy = () => {
    setIsLoading(false);
    setResult(dummyResult);
  }

  const handleDownloadPdf = async () => {
    const element = analysisRef.current;
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

        pdf.save('synapse-adaptive-management.pdf');
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
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("Adaptive Management")}</CardTitle>
              <CardDescription>
                {t("Get real-time recommendations to optimize your project.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Project Description")}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="teamStructures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Team Structures")}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Current Status")}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="performanceData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Performance Data")}</FormLabel>
                        <FormControl>
                          <Textarea
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
                      {t("Generate Recommendations")}
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
          <div className="space-y-6">
            <div ref={analysisRef}>
              <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle>{t("AI-Generated Analysis")}</CardTitle>
                  </div>
                  <div className='flex items-center gap-2'>
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
                  {result ? (
                    <div className="prose dark:prose-invert max-w-none space-y-6">
                      <div>
                        <h3 className="font-semibold">{t("Recommendations")}</h3>
                        <p className="whitespace-pre-line">{result.recommendations}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold">{t("Risk Assessment")}</h3>
                        <p className="whitespace-pre-line">{result.riskAssessment}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold">{t("Performance Forecast")}</h3>
                        <p className="whitespace-pre-line">{result.performanceForecast}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-semibold">{t("Strategic Alignment")}</h3>
                        <p className="whitespace-pre-line">{result.strategicAlignment}</p>
                      </div>
                    </div>
                  ) : (
                    !isLoading && (
                      <p className="text-muted-foreground">
                        {t("Your generated analysis will appear here.")}
                      </p>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
