"use client";

import { useEffect, useState } from "react";

export default function useShouldSkipInitialEntrance(threshold = 40) {
  const [shouldSkip, setShouldSkip] = useState(false);

  useEffect(() => {
    setShouldSkip(window.scrollY > threshold);
  }, [threshold]);

  return shouldSkip;
}
