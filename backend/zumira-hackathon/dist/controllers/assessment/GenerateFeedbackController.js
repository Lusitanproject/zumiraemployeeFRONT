"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateFeedbackController = void 0;
const zod_1 = require("zod");
const parseZodError_1 = require("../../utils/parseZodError");
const GenerateFeedbackService_1 = require("../../services/assessment/GenerateFeedbackService");
const GenerateFeedbackSchema = zod_1.z.object({
    id: zod_1.z.string().cuid(),
});
class GenerateFeedbackController {
    async handle(req, res) {
        const { success, data, error } = GenerateFeedbackSchema.safeParse(req.params);
        if (!success)
            throw new Error((0, parseZodError_1.parseZodError)(error));
        const { id: assessmentId } = data;
        const userId = req.user.id;
        const generateFeedback = new GenerateFeedbackService_1.GenerateFeedbackService();
        const feedback = await generateFeedback.execute({ userId, assessmentId });
        return res.json({ status: "SUCCESS", data: feedback });
    }
}
exports.GenerateFeedbackController = GenerateFeedbackController;
