'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronsRight } from 'lucide-react';
import { synapseChat } from '@/ai/flows/synapse-chat';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  query: z.string().min(1, 'Please enter a question.'),
});

export default function ChatInterface() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await synapseChat(values.query);
      setResponse(result);
    } catch (error) {
      console.error('Error with chatbot:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <Input
          {...form.register('query')}
          type="search"
          placeholder="Ask anything... (e.g., 'What's the status of Project Phoenix?')"
          className="h-10 w-full rounded-full bg-muted pl-10 pr-20"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronsRight className="h-4 w-4" />
          )}
        </Button>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">✨</span>
      </form>
      {response && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm">{response}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
