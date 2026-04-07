"use client";

import { useEffect, useState } from "react";

export function useAnimatedNumber(value: number, duration = 400) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start: number | null = null;
    const initial = displayValue;
    const diff = value - initial;

    function animate(timestamp: number) {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setDisplayValue(initial + diff * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value]);

  return Math.round(displayValue);
}
