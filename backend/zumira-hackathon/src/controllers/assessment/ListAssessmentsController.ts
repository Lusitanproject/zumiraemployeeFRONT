import { Request, Response } from "express";
import { ListAssessmentsService } from "../../services/assessment/ListAssessmentsService";

class ListAssessmentsController {
    async handle(req: Request, res: Response) {
        // @ts-ignore
        const userId = req.userId;

        const listAssessments = new ListAssessmentsService();
        const assessments = await listAssessments.execute(userId);

        return res.json({ status: "SUCCESS", data: assessments });
    }
}

export { ListAssessmentsController };
