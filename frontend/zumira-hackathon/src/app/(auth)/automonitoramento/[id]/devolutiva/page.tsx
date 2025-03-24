import { getFeedback } from "./actions";
import { Feedback } from "./components/feedback";
import { NoData } from "./components/no-data";

export default async function Devolutiva({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feedback = (await getFeedback(id)).data;

  const content = feedback?.items.length ? (
    <Feedback
      key={feedback.items[0].id}
      title={feedback.items[0].assessment.title}
      subtitle={feedback.items[0].assessment.psychologicalDimensions.map((d) => d.name).join(", ")}
      text={feedback.items[0].text}
    />
  ) : (
    <NoData selfMonitoringBlockId={id} />
  );

  return <div className="flex size-full py-10">{content}</div>;
}
