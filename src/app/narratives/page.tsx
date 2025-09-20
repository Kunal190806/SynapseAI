// src/app/narratives/page.tsx
'use client';

import {useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  generateStrategicNarrative,
  GenerateStrategicNarrativeInput,
  GenerateStrategicNarrativeOutput,
} from '@/ai/flows/generate-strategic-narrative';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Loader2, Activity, Target, CheckCircle, BrainCircuit, Download} from 'lucide-react';
import AppHeader from '@/components/layout/header';
import AppNavbar from '@/components/layout/navbar';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required.'),
  projectGoals: z.string().min(1, 'Project goals are required.'),
  progressSummary: z.string().min(1, 'Progress summary is required.'),
  keyAchievements: z.string().min(1, 'Key achievements are required.'),
  challengesFaced: z.string().min(1, 'Challenges faced are required.'),
  alignmentToStrategicGoals: z
    .string()
    .min(1, 'Alignment to strategic goals is required.'),
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


export default function NarrativesPage() {
  const { t } = useTranslation();
  const [narrative, setNarrative] =
    useState<GenerateStrategicNarrativeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const narrativeRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectGoals: '',
      progressSummary: '',
      keyAchievements: '',
      challengesFaced: '',
      alignmentToStrategicGoals: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setNarrative(null);
    try {
      const result = await generateStrategicNarrative(values);
      setNarrative(result);
    } catch (error) {
      console.error('Error generating narrative:', error);
      // Optionally, show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownloadPdf = async () => {
    const element = narrativeRef.current;
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

        pdf.save('synapse-narrative.pdf');
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
              <CardTitle>{t("Narrative Studio")}</CardTitle>
              <CardDescription>
                {t("Transform organizational data into interactive storytelling experiences. See contributions inside a living story of the company’s journey.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Project Name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("e.g., QuantumLeap CRM Integration")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectGoals"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Project Goals")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., To integrate the new QuantumLeap CRM system with our existing sales and marketing platforms. Key objectives include migrating all customer data, training the sales team, and achieving a 30% reduction in manual data entry by the end of Q3.")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="progressSummary"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Progress Summary")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., We are currently at 75% completion. The data migration module is complete and has been tested successfully. The development of the marketing automation sync is underway, with 5 of 8 endpoints delivered. User acceptance testing is scheduled to begin in two weeks.")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keyAchievements"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Key Achievements")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., 1. Completed data migration from legacy CRM with 99.8% accuracy. 2. Received positive feedback on the new UI from our internal sales champions. 3. Negotiated a 15% discount on the QuantumLeap enterprise license.")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="challengesFaced"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Challenges Faced")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., We encountered unexpected API limitations with the legacy marketing platform, requiring a custom middleware solution. This has introduced a two-week delay, but the team has mitigated further schedule risk by parallelizing other tasks.")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alignmentToStrategicGoals"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t("Alignment to Strategic Goals")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("e.g., This project is a cornerstone of our 'Customer 360' strategic initiative. By centralizing customer data, we will empower the sales team to improve cross-selling opportunities by 25%, directly impacting our goal to increase annual recurring revenue.")}
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
                    {t("Generate Narrative")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="space-y-6" ref={narrativeRef}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("Generated Strategic Narrative")}</CardTitle>
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
                {narrative ? (
                  <div className="prose dark:prose-invert">
                    <p>{narrative.strategicNarrative}</p>
                  </div>
                ) : (
                  !isLoading && (
                    <p className="text-muted-foreground">
                      {t("Your generated narrative will appear here.")}
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
