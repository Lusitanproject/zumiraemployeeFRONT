"use server"

import { cookies } from "next/headers"
import {
  AssessmentQuestionChoices,
  FormState,
  MutateAssessmentResult,
  SaveAssessmentAnswerSchema
} from "../definitions"
import { catchError } from "@/utils/error"
import { decrypt } from "@/app/_lib/session"
import { redirect, RedirectType } from "next/navigation"

export async function saveAnswersAction(tate: FormState, formData: FormData): Promise<FormState> {
  const data = []

  for (const answer of formData.entries()) {
    data.push({ key: answer[0], value: answer[1] as string })
  }

  const answers: AssessmentQuestionChoices = data
    .filter(item => item.key !== "assessmentId" && item.key.indexOf("$ACTION_") === -1)
    .map(item => ({
      assessmentQuestionId: item.key,
      assessmentQuestionChoiceId: item.value
    }))

  const assessmentId = data.find(item => item.key === "assessmentId")?.value

  const validationResult = SaveAssessmentAnswerSchema.safeParse({
    assessmentId,
    answers
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  console.log(validationResult.data)

  const cookie = await cookies()
  const session = decrypt(cookie.get("session")?.value)

  const url = `${process.env.API_BASE_URL}/assessments/results`

  const [error, response] = await catchError(fetch(url, {
    method: "POST",
    body: JSON.stringify(validationResult.data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  }))

  if (error) {
    return {
      errors: {
        assessmentId: [error?.message]
      }
    }
  }

  if (!response.ok) {
    return {
      errors: {
        assessmentId: [response.statusText]
      }
    }
  }

  const result = (await response.json()) as MutateAssessmentResult

  if(result.status === "SUCCESS") {
    redirect("/autogestao/teste/concluido", RedirectType.replace)
  }
}
