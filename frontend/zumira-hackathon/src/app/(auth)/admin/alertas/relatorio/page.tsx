"use client";

import { getCompanyFeedback } from "@/api/companies";
import { Spinner } from "@/components/custom/spinner";
import { AlertsContext } from "@/providers/alerts";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function Relatorio() {
  const { assessmentId, companyId } = useContext(AlertsContext);
  const [content, setContent] = useState<string>();

  async function fetchFeedback() {
    if (!companyId || !assessmentId) return;
    try {
      const feedback = await getCompanyFeedback(companyId, assessmentId);
      if (feedback) {
        setContent(feedback.text);
      } else {
        setContent("Esse teste ainda não gerou relatório.");
      }
    } catch (err) {
      if (err instanceof Error) throw new Error(err.message);
    }
  }

  useEffect(() => {
    fetchFeedback();
  }, [assessmentId, companyId]);

  if (!content)
    return (
      <span className="flex w-full text-center justify-center text-text-500 p-1.5">
        <Spinner color="var(--color-gray-300)" size="xl" />
      </span>
    );

  return (
    <div className="markdown prose lg:prose-xl">
      <Markdown>{content}</Markdown>
    </div>
  );
}
