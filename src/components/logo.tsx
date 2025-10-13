import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary">
      <BrainCircuit className="h-6 w-6" />
      <span className={className}>MindCare Pakistan</span>
    </Link>
  );
}
