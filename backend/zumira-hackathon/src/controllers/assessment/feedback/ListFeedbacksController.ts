import { Request, Response } from "express";
import { ListFeedbacksService } from "../../../services/assessment/feedback/ListFeedbacksService";

class ListFeedbacksController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;

    const ListFeedbackss = new ListFeedbacksService();
    const data = await ListFeedbackss.execute(userId);

    return res.json({ status: "SUCCESS", data: data });
  }
}

export { ListFeedbacksController };
