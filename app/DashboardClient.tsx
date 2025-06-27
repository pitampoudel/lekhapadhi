"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface DashboardClientProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardClient({ setActiveTab }: DashboardClientProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['dashboard', 'documents', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, setActiveTab]);

  // This component doesn't render anything visible
  return null;
}