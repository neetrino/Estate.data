export function moveItemToIndex<T extends { id: string }>(
  items: readonly T[],
  id: string,
  toIndex: number,
): T[] {
  const fromIndex = items.findIndex((item) => item.id === id);
  if (fromIndex < 0 || fromIndex === toIndex) {
    return items as T[];
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  if (!moved) {
    return [...items];
  }

  const clampedIndex = Math.max(0, Math.min(toIndex, next.length));
  next.splice(clampedIndex, 0, moved);
  return next;
}

export function isSameIdOrder(
  left: readonly { id: string }[],
  right: readonly { id: string }[],
): boolean {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((item, index) => item.id === right[index]?.id);
}
