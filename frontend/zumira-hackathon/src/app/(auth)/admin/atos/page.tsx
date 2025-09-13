import { getTrailsAdmin } from "@/api/trails";

import { ActsList } from "./components/list";

export default async function Atos({ searchParams }: { searchParams: { trailId?: string } }) {
  const trails = await getTrailsAdmin();
  const trailId = searchParams.trailId ?? trails[0]?.id;

  return (
    <div className="flex flex-col w-full">
      <ActsList trailId={trailId} trails={trails} />
    </div>
  );
}
