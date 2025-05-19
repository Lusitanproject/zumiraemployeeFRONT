import { Result } from "../definitions";

interface AlertsTableProps {
  results: Result[];
}

export function AlertsTable({ results }: AlertsTableProps) {
  function formatDate(date: Date) {
    return `${date.getDay()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
  }

  if (!results.length) {
    return <span className="w-full text-center text-gray-400">Sem resultados</span>;
  }

  const sample = results.length ? results[0] : null;

  return (
    <div className="rounded-xl border-1 border-gray-300 overflow-hidden">
      <table className="min-w-full text-sm text-center rounded-xl">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="p-2">Código</th>
            <th className="p-2">Perfil de risco</th>
            {sample &&
              sample.scores.map((score) => (
                <td key={score.dimension.id} className="p-2">
                  Escore {score.dimension.acronym}
                </td>
              ))}
            <th className="p-2">Ultima avaliação</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            return (
              <tr key={result.id} className="border-b border-gray-200">
                <td className="p-2">{`C-${String(index + 1).padStart(3, "0")}`}</td>
                <td className="p-2">{result.assessmentResultRating.profile}</td>
                {result.scores.map((score) => (
                  <td key={score.dimension.id} className="p-2">
                    {score.value}
                  </td>
                ))}
                <td className="p-2">{formatDate(new Date(result.createdAt))}</td>
                <td className="p-2 flex flex-row items-center justify-center gap-2">
                  <div
                    className="size-3.5 rounded-full flex-none border-1 border-gray-300"
                    style={{ backgroundColor: result.assessmentResultRating.color }}
                  />
                  {result.assessmentResultRating.risk}
                  <div className="size-3.5 flex-none" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
