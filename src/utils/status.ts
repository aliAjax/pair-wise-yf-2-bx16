import type { Bench, BenchStatusChange, BenchStatusType } from '@/types';

/**
 * 旧档案第一次打开时没有使用状态，统一按“开放”处理。
 */
export function normalizeBenchStatus(bench: Bench): Bench {
  if (bench.status === undefined || bench.status === null) {
    return {
      ...bench,
      status: 'open' as BenchStatusType,
      statusHistory: Array.isArray(bench.statusHistory) ? bench.statusHistory : [],
    };
  }
  if (!Array.isArray(bench.statusHistory)) {
    return { ...bench, statusHistory: [] };
  }
  return bench;
}

export function getLatestStatusChange(bench: Bench): BenchStatusChange | undefined {
  if (!bench.statusHistory || bench.statusHistory.length === 0) return undefined;
  return [...bench.statusHistory].sort((a, b) => (a.changedAt < b.changedAt ? 1 : -1))[0];
}

export function formatStatusDate(changedAt: string): string {
  return new Date(changedAt).toLocaleDateString('zh-CN');
}

/** 状态变更弹窗默认日期：今天（YYYY-MM-DD，本地时区） */
export function todayDateInput(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isBenchInactive(bench: Bench): boolean {
  return normalizeBenchStatus(bench).status === 'inactive';
}
