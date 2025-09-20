// src/app/insights/page.tsx
'use client';

import { useState } from 'react';
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
import { Loader2, Activity, Target, CheckCircle, BrainCircuit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  const [insights, setInsights] = useState<GetAiPoweredInsightsOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Collective Intelligence</CardTitle>
          <CardDescription>
            Surface insights from the ground up by analyzing feedback, ideas, and patterns across teams.
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
                    <FormLabel>Organizational Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., - Quarterly Sales Report (Q2 2024): Revenue up 15% YoY, but profit margin decreased by 2% due to increased marketing spend.
- Team Performance Metrics: Engineering velocity is 20 points/sprint. Support ticket resolution time is averaging 48 hours.
- Market Analysis: Competitor X launched a new feature that is gaining traction. Customer feedback suggests a desire for better mobile integration."
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
                Generate Insights
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generated Insights & Recommendations</CardTitle>
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
                  <h3 className="font-semibold">Insights</h3>
                  <p>{insights.insights}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Recommendations</h3>
                  <p>{insights.recommendations}</p>
                </div>
              </div>
            ) : (
              !isLoading && (
                <p className="text-muted-foreground">
                  Your generated insights will appear here.
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
                <div className="flex items-center gap-2"><Target className="w-4 h-4 text-muted-foreground" /> Purpose Alignment: <strong>{dashboardData.overallAlignment}</strong></div>
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
