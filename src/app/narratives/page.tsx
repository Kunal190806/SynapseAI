// src/app/narratives/page.tsx
'use client';

import {useState} from 'react';
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
import {Loader2, Activity, Target, CheckCircle, BrainCircuit} from 'lucide-react';

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
  const [narrative, setNarrative] =
    useState<GenerateStrategicNarrativeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Narrative Generator</CardTitle>
          <CardDescription>
            Transform raw operational data into a strategic story.
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
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., QuantumLeap CRM Integration" {...field} />
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
                    <FormLabel>Project Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., To integrate the new QuantumLeap CRM system with our existing sales and marketing platforms. Key objectives include migrating all customer data, training the sales team, and achieving a 30% reduction in manual data entry by the end of Q3."
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
                    <FormLabel>Progress Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., We are currently at 75% completion. The data migration module is complete and has been tested successfully. The development of the marketing automation sync is underway, with 5 of 8 endpoints delivered. User acceptance testing is scheduled to begin in two weeks."
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
                    <FormLabel>Key Achievements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 1. Completed data migration from legacy CRM with 99.8% accuracy. 2. Received positive feedback on the new UI from our internal sales champions. 3. Negotiated a 15% discount on the QuantumLeap enterprise license."
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
                    <FormLabel>Challenges Faced</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., We encountered unexpected API limitations with the legacy marketing platform, requiring a custom middleware solution. This has introduced a two-week delay, but the team has mitigated further schedule risk by parallelizing other tasks."
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
                    <FormLabel>Alignment to Strategic Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., This project is a cornerstone of our 'Customer 360' strategic initiative. By centralizing customer data, we will empower the sales team to improve cross-selling opportunities by 25%, directly impacting our goal to increase annual recurring revenue."
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
                Generate Narrative
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Strategic Narrative</CardTitle>
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
                  Your generated narrative will appear here.
                </p>
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Data</CardTitle>
            <CardDescription>
              Live data from the main dashboard for context.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
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
      </div>
    </div>
  );
}
