import { Request, Response } from "express";
import { ListFeedbackService } from "../../../services/assessment/feedback/ListFeedbacksService";

class ListFeedbackController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;

    const listFeedbacks = new ListFeedbackService();
    const data = await listFeedbacks.execute(userId);

    return res.json({ status: "SUCCESS", data: data });
  }
}

export { ListFeedbackController };
