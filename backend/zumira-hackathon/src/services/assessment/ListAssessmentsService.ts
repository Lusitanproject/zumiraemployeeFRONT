import prismaClient from "../../prisma";

class ListAssessmentsService {
    async execute(userId: string) {
        const userExists = await prismaClient.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!userExists) throw new Error("User does not exist");

        const assessments = await prismaClient.assessment.findMany({
            select: {
                id: true,
                title: true,
                summary: true,
                selfMonitoringBlock: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                assessmentResults: {
                    where: {
                        userId: userId,
                    },
                    select: {
                        createdAt: true,
                    },
                },
            },
        });

        const formattedAssessments = assessments.map((a) => ({
            id: a.id,
            title: a.title,
            summary: a.summary,
            selfMonitoring: a.selfMonitoringBlock,
            lastCompleted: new Date(Math.max(...a.assessmentResults.map((r) => new Date(r.createdAt).getTime()))),
        }));

        return { assessments: formattedAssessments };
    }
}

export { ListAssessmentsService };
