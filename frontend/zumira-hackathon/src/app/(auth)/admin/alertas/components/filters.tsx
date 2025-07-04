import { useContext } from "react";

import { Label } from "@/components/custom/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertsContext } from "@/providers/alerts";
import { Assessment } from "@/types/assessment";
import { Company } from "@/types/company";

interface FiltersProps {
  assessments: Assessment[];
  companies: Company[];
}

export function Filters({ assessments, companies }: FiltersProps) {
  const { assessmentId, setAssessmentId, companyId, setCompanyId } = useContext(AlertsContext);

  return (
    <div className="bg-background-100 p-3 pt-2 rounded-xl border-1 border-border-300">
      <span className="text-lg font-semibold text-text-400">Filtros</span>
      <div className="flex flex-row w-full justify-between items-end flex-wrap">
        <div className="flex flex-row gap-2 items-center flex-wrap">
          <div>
            <Label htmlFor="company">Empresa</Label>
            <Select defaultValue={companyId} name="company" onValueChange={(value) => setCompanyId(value)}>
              <SelectTrigger className="w-64 bg-background-0 text-text-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-text-700">
                {companies?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="assessment">Teste</Label>
            <Select defaultValue={assessmentId} name="assessment" onValueChange={(value) => setAssessmentId(value)}>
              <SelectTrigger className="w-64 bg-background-0 text-text-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="text-text-700">
                {assessments?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
