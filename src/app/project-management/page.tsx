// src/app/project-management/page.tsx
'use client';

import { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  projectDescription: z.string().min(1, 'Project description is required.'),
  teamStructures: z.string().min(1, 'Team structures are required.'),
  currentStatus: z.string().min(1, 'Current status is required.'),
  performanceData: z.string().min(1, 'Performance data is required.'),
});

export default function ProjectManagementPage() {
  const [result, setResult] =
    useState<AdaptiveProjectManagementOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: '',
      teamStructures: '',
      currentStatus: '',
      performanceData: '',
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
      // Optionally, show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Adaptive Project Management</CardTitle>
          <CardDescription>
            Get real-time recommendations to optimize your project.
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
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, its goals, and objectives."
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
                    <FormLabel>Team Structures</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide an overview of the different teams involved and their roles."
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
                    <FormLabel>Current Status</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Summarize the current project status, including progress, roadblocks, and recent milestones."
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
                    <FormLabel>Performance Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide data on team and individual performance (e.g., task completion rates, time on tasks)."
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
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Analysis</CardTitle>
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
                  <h3 className="font-semibold">Recommendations</h3>
                  <p>{result.recommendations}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Risk Assessment</h3>
                  <p>{result.riskAssessment}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Performance Forecast</h3>
                  <p>{result.performanceForecast}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold">Strategic Alignment</h3>
                  <p>{result.strategicAlignment}</p>
                </div>
              </div>
            ) : (
              !isLoading && (
                <p className="text-muted-foreground">
                  Your generated analysis will appear here.
                </p>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
