import { useState, useEffect } from 'react';
import { getPendingQuestions } from '../lib/services/unReviewService';
import type { UNQuestion } from '../types';

export function useUNReview() {
  const [questions, setQuestions] = useState<UNQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const pendingQuestions = await getPendingQuestions();
        setQuestions(pendingQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch UN review questions');
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return { questions, loading, error };
}