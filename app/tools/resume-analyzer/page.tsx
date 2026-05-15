import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Resume Score & ATS Audit Tool 2026 | CareerWithMohit',
  description: 'Free AI-powered resume analyzer. Check your resume score, get a complete audit for freshers and experienced, and create ATS-friendly resumes for top companies.',
  keywords: ['resume score', 'resume audit', 'ATS resume builder', 'career tool', 'job search', 'freshers resume', 'experienced resume'],
};

export default function ResumeAnalyzerPage() {
  return (
    <main>
      <ResumeAnalyzer />
    </main>
  );
}
