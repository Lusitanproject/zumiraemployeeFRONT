"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAssessmentController = void 0;
const parseZodError_1 = require("../../utils/parseZodError");
const CreateAssessmentService_1 = require("../../services/assessment/CreateAssessmentService");
const assessment_1 = require("../../definitions/admin/assessment");
class CreateAssessmentController {
    async handle(req, res) {
        const { success, data, error } = assessment_1.CreateAssessmentSchema.safeParse(req.body);
        if (!success)
            throw new Error((0, parseZodError_1.parseZodError)(error));
        const createAssessment = new CreateAssessmentService_1.CreateAssessmentService();
        const assessment = await createAssessment.execute({ ...data });
        return res.json({ status: "SUCCESS", data: assessment });
    }
}
exports.CreateAssessmentController = CreateAssessmentController;
