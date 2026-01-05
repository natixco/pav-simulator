import { browser } from '$app/environment';

export class LocalStore<T> {
  constructor(private readonly key: string) {}

  getAll(): T[] {
    if (!browser) {
      return [];
    }

    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Failed to load ${this.key}`, e);
      return [];
    }
  }

  add(item: T): void {
    if (!browser) {
      return;
    }

    const items = this.getAll();
    items.push(item);
    localStorage.setItem(this.key, JSON.stringify(items));
  }
}