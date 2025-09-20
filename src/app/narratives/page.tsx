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
                      <Input placeholder="e.g., Project Phoenix" {...field} />
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
                        placeholder="e.g., Achieve 20% market share..."
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
                        placeholder="e.g., Completed phase 1, currently in user testing..."
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
                        placeholder="e.g., Launched beta, secured 1000 users..."
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
                        placeholder="e.g., Unexpected technical debt, competitor launch..."
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
                        placeholder="e.g., This project directly supports our Q3 goal of user expansion."
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
