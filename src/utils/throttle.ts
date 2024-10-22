/**
 * Функция тротлинга
 * @param func Функция которая будет выполнятся с задержкой.
 * @param ms Количество миллесекунд для выполнения функции.
 * @returns Функция которая будет выполнятся с задержкой.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, ms: number): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function perform(...args: Parameters<T>) {
    if (timer) return;
    timer = setTimeout(() => {
      func(...args)

      clearTimeout(timer);
      timer = null;
    }, ms);
  };
}
