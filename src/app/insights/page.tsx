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
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  organizationalData: z.string().min(1, 'Organizational data is required.'),
});

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
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Generate predictive analytics and adaptive goal setting recommendations.
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
                        placeholder="Paste any relevant data here: project reports, team performance metrics, market analysis, etc."
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
      </div>
    </div>
  );
}
