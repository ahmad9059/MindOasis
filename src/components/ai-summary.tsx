'use client';

import { useState, useTransition } from 'react';
import { generateProfileSummary } from '@/ai/flows/generate-profile-summary';
import type { Therapist } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function AiSummary({ therapist }: { therapist: Therapist }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateProfileSummary({
          name: therapist.name,
          education: therapist.education || 'Not provided',
          experience: therapist.experience || 'Not provided',
          expertise: therapist.expertise || 'Not provided',
          about: therapist.about || 'Not provided',
        });
        setSummary(result.summary);
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Error generating summary',
          description: errorMessage,
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      {!summary && !isPending && (
         <div className="text-center p-4 border-2 border-dashed rounded-lg">
            <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-foreground">Smart Insights Generator</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                Get a quick, AI-powered summary of this therapist's profile.
            </p>
            <Button
                onClick={handleGenerateSummary}
                disabled={isPending}
                className="mt-4"
                size="sm"
            >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Summary
            </Button>
         </div>
      )}

      {isPending && (
        <div className="flex items-center justify-center rounded-lg border p-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Generating summary...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Generation Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              AI Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/90 whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
