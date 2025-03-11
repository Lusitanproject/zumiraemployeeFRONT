import prismaClient from "../../prisma";

class DetailAssessmentService {
    async execute(assessmentId: string) {
        const assessment = await prismaClient.assessment.findFirst({
            where: {
                id: assessmentId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                assessmentQuestions: {
                    select: {
                        id: true,
                        description: true,
                        assessmentQuestionChoices: {
                            select: {
                                id: true,
                                label: true,
                                value: true,
                            },
                        },
                    },
                },
            },
        });

        if (!assessment) throw new Error("Assessment does not exist");

        return assessment;
    }
}

export { DetailAssessmentService };
