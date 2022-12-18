export default function throttle<T extends unknown[]>(
  callback: (...params: T) => void,
  limit = 300
) {
  let waiting = false;
  return (...params: T) => {
    if (!waiting) {
      waiting = true;
      setTimeout(() => {
        callback(...params);
        waiting = false;
      }, limit);
    }
  };
}
