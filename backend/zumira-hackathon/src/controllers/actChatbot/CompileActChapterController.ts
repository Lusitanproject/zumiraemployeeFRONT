import { Request, Response } from "express";
import { CompileActChapterSchema } from "../../definitions/actChatbot";
import { parseZodError } from "../../utils/parseZodError";
import { CompileActChapterService } from "../../services/actChatbot/CompileActChapterService";

class CompileActChapterController {
  async handle(req: Request, res: Response) {
    const { success, data, error } = CompileActChapterSchema.safeParse(req.body);
    if (!success) throw new Error(parseZodError(error));

    const service = new CompileActChapterService();
    const result = await service.execute({ ...data, userId: req.user.id });

    return res.json({ status: "SUCCESS", data: result });
  }
}

export { CompileActChapterController };
