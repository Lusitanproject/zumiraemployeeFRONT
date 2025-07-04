"use client";

import { useContext, useEffect, useState } from "react";
import { AlertsTable } from "./components/alerts-table";
import { AlertsContext } from "@/providers/alerts";
import { getAssessmentResultsFiltered } from "@/api/assessments";
import { AssessmentResult } from "@/types/assessment";
import { Filters } from "./definitions";

export default function Alertas() {
  const { assessmentId, companyId } = useContext(AlertsContext);

  const [results, setResults] = useState<AssessmentResult[]>();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchResults(data: Filters) {
    console.log("ue poirra");
    setLoading(true);
    const newData = await getAssessmentResultsFiltered(data);
    setResults(newData);
    setLoading(false);
  }

  useEffect(() => {
    if (!assessmentId) return;
    fetchResults({ assessmentId, companyId });
  }, [assessmentId, companyId]);

  return (
    <div className="flex size-full flex-col gap-2">
      <AlertsTable results={results} loading={loading} />
    </div>
  );
}
