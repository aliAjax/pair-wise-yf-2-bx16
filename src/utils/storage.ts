import type { Bench } from '@/types';
import { normalizeBenchStatus } from '@/utils/status';

const STORAGE_KEY = 'bench-archive-data';

export function loadBenches(): Bench[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed: Bench[] = JSON.parse(data);
      // 旧档案第一次打开时按“开放”处理
      return parsed.map((bench) => normalizeBenchStatus(bench));
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
