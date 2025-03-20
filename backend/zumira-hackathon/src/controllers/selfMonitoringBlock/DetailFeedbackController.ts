import { Request, Response } from "express";
import { z } from "zod";
import { parseZodError } from "../../utils/parseZodError";
import { DetailFeedbackService } from "../../services/selfMonitoringBlock/DetailFeedbackService";
import { UpdateFeedbackService } from "../../services/selfMonitoringBlock/UpdateFeedbackService";

const DetailFeedbackSchema = z.object({
  id: z.string().cuid(),
});

class DetailFeedbackController {
  async handle(req: Request, res: Response) {
    const { success, data, error } = DetailFeedbackSchema.safeParse(req.params);

    if (!success) throw new Error(parseZodError(error));

    const { id: selfMonitoringBlockId } = data;
    const userId = req.user.id;

    const detailFeedback = new DetailFeedbackService();
    let feedback = await detailFeedback.execute({ userId, selfMonitoringBlockId });

    // Temporary
    if (!feedback) {
      console.log("Generating feedback");
      const updateFeedback = new UpdateFeedbackService();
      feedback = await updateFeedback.execute({ userId, selfMonitoringBlockId });
    }

    return res.json({ status: "SUCCESS", data: feedback });
  }
}

export { DetailFeedbackController };
