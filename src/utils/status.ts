import type { Bench, BenchStatusChange } from '@/types';

export function getLatestStatusChange(bench: Bench): BenchStatusChange | null {
  if (!bench.statusHistory || bench.statusHistory.length === 0) {
    return null;
  }
  return bench.statusHistory[bench.statusHistory.length - 1];
}

export function formatStatusDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-CN');
}
