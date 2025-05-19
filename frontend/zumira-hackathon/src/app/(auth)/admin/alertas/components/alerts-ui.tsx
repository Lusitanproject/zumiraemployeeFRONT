"use client";

import { useState } from "react";
import { Assessment, Company, Filters as FiltersType, Result } from "../definitions";
import { AlertsTable } from "./alerts-table";
import { Filters } from "./filters";
import { getFilteredResults } from "../actions";

interface AlertsUIProps {
  assessments: Assessment[];
  companies: Company[];
}

export function AlertsUI({ assessments, companies }: AlertsUIProps) {
  const [results, setResults] = useState<Result[]>([]);

  async function fetchResults(data: FiltersType) {
    const newData = await getFilteredResults(data);
    setResults(newData);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h2 className="text-xl text-gray-500">Selecione os filtros: </h2>
        <Filters assessments={assessments} companies={companies} onChangeFilters={fetchResults} />
      </div>
      <div className="flex flex-col gap-2">
        {!!results.length && <h2 className="text-xl text-gray-500">Resultados: </h2>}
        <AlertsTable results={results} />
      </div>
    </div>
  );
}
