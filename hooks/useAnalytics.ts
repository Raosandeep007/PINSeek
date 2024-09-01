import { AnalyticsBrowser } from "@june-so/analytics-next";
import { useEffect, useState } from "react";

const writeKey = process.env.NEXT_PUBLIC_JUNE_WRITE_KEY;
export const useJune = () => {
  const [analytics, setAnalytics] = useState<AnalyticsBrowser | undefined>(
    undefined
  );

  useEffect(() => {
    const loadAnalytics = async () => {
      let response = AnalyticsBrowser.load({
        writeKey: "54VFegy6rIyYksdE",
      });
      setAnalytics(response);
    };
    loadAnalytics();
  }, [writeKey]);

  return { analytics };
};
