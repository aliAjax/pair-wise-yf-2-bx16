import { CircleCheck, CircleAlert, Ban } from 'lucide-react';
import { BENCH_STATUS_LABELS } from '@/types';
import type { BenchStatusType } from '@/types';

const STATUS_STYLES: Record<BenchStatusType, { icon: typeof CircleCheck; className: string }> = {
  open: { icon: CircleCheck, className: 'bg-moss-green/10 text-moss-green' },
  restricted: { icon: CircleAlert, className: 'bg-ochre/10 text-ochre' },
  closed: { icon: Ban, className: 'bg-red-500/10 text-red-500' },
};

interface StatusBadgeProps {
  status: BenchStatusType;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const { icon: Icon, className } = STATUS_STYLES[status];
  const sizeClass = size === 'md' ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass} ${className}`}>
      <Icon className={size === 'md' ? 'w-4 h-4' : 'w-3 h-3'} />
      {BENCH_STATUS_LABELS[status]}
    </span>
  );
}
