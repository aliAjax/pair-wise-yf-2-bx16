import type { Bench } from '@/types';

const STORAGE_KEY = 'bench-archive-data';

export function loadBenches(): Bench[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as Bench[];
      // 旧档案没有使用状态字段，第一次打开时按开放处理
      return parsed.map((bench) => ({
        ...bench,
        status: bench.status ?? 'open',
        statusHistory: bench.statusHistory ?? [],
      }));
    }
  } catch (error) {
    console.error('Failed to load benches from localStorage:', error);
  }
  return [];
}

export function saveBenches(benches: Bench[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(benches));
  } catch (error) {
    console.error('Failed to save benches to localStorage:', error);
  }
}

export function clearBenches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear benches from localStorage:', error);
  }
}
