import { CheckCircle2, AlertTriangle, Ban } from 'lucide-react';
import type { BenchStatusType } from '@/types';
import { BENCH_STATUS_LABELS } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: BenchStatusType;
  size?: 'sm' | 'md';
  className?: string;
}

const STATUS_STYLES: Record<BenchStatusType, { container: string; icon: typeof CheckCircle2 }> = {
  open: {
    container: 'bg-moss-green/10 text-moss-green',
    icon: CheckCircle2,
  },
  restricted: {
    container: 'bg-ochre/10 text-ochre',
    icon: AlertTriangle,
  },
  inactive: {
    container: 'bg-ink-light/15 text-ink-light',
    icon: Ban,
  },
};

export default function StatusBadge({ status, size = 'sm', className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.open;
  const Icon = style.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
        style.container,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {BENCH_STATUS_LABELS[status] ?? BENCH_STATUS_LABELS.open}
    </span>
  );
}
