import { useState, useEffect } from 'react';
import { getRecentReports, getReportStats } from '../lib/services/reportService';
import type { Report } from '../types';

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    escalated: 0,
    resolved: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [recentReports, reportStats] = await Promise.all([
          getRecentReports(),
          getReportStats()
        ]);

        if (mounted) {
          setReports(recentReports);
          setStats(reportStats);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error fetching reports:', err);
          setError('Failed to load dashboard data. Please try again later.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { reports, stats, loading, error };
}