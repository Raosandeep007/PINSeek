import { AnalyticsBrowser } from "@june-so/analytics-next";
import { useEffect, useState } from "react";

const writeKey = process.env.NEXT_PUBLIC_JUNE_WRITE_KEY;
export const useJune = () => {
  const [analytics, setAnalytics] = useState<AnalyticsBrowser | undefined>(
    undefined
  );

  useEffect(() => {
    const loadAnalytics = async () => {
      if (writeKey) {
        let response = AnalyticsBrowser.load({
          writeKey,
        });
        setAnalytics(response);
      }
    };
    loadAnalytics();
  }, [writeKey]);

  return { analytics };
};
