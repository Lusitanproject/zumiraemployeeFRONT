"use client"

import { useActionState } from "react"

import { AssessmentDetail } from "./definitions"
import { saveAnswersAction } from "./actions/form-handler"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { redirect, RedirectType } from "next/navigation"

type AssessmentFormProps = {
  data: AssessmentDetail
  assessmentId: string
}

export function AssessmentForm({ assessmentId, data }: AssessmentFormProps) {
  const [state, action, pending] = useActionState(saveAnswersAction, undefined)

  console.warn(state)

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col pt-4 pb-8 border-b border-gray-200">
        <h2 className="text-2xl text-gray-700 font-medium mb-8">{data.title}</h2>
        {!!data.description && <p className="text-base leading-6 text-gray-600">{data.description}</p>}
      </div>

      <form className="w-full flex flex-col flex-1 md:pb-24" action={action}>
        <input type="hidden" value={assessmentId} name="assessmentId" />
        {data.assessmensQuestions.map((item, index) => (
          <div
            key={item.id}
            className="w-full mb-4 border-b border-gray-100 pt-6 pb-8"
          >
            <p className="font-medium text-gray-700 mb-6">
              <span className="font-bold text-gray-700">{index + 1}.</span> {item.description}
            </p>
            <div className="flex flex-col pl-4">
              <RadioGroup name={item.id} required>
                {item.assessmentQuestionChoices?.sort((a, b) => a.index - b.index).map(choice => (
                  <div className="flex items-center gap-x-3" key={choice.id}>
                    <RadioGroupItem value={`${choice.id}`} id={choice.id} />
                    <label htmlFor={choice.id}>{choice.label}</label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
        <div className="md:border-t border-gray-100 md:absolute md:left-0 md:right-0 md:bottom-0 py-4 md:px-16 md:bg-gray-50 flex items-center md:justify-end gap-x-3">
          <Button size="xl" variant="outline" type="button" onClick={() => redirect("/autogestao", RedirectType.replace)}>Cancelar</Button>
          <Button size="xl" variant="primary" type="submit" disabled={pending}>Enviar respostas</Button>
        </div>
      </form>
    </div>
  )
}
