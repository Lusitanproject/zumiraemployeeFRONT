"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentDetailForAdminController = void 0;
const zod_1 = require("zod");
const parseZodError_1 = require("../../utils/parseZodError");
const AssessmentDetailAdmin_1 = require("../../services/assessment/AssessmentDetailAdmin");
const assertPermissions_1 = require("../../utils/assertPermissions");
const GetAssessmentDetailForAdminSchema = zod_1.z.object({
    id: zod_1.z.string().cuid(),
});
class AssessmentDetailForAdminController {
    async handle(req, res) {
        (0, assertPermissions_1.assertPermissions)(req.user, "read-assessment");
        const { success, data, error } = GetAssessmentDetailForAdminSchema.safeParse(req.params);
        if (!success) {
            return res.status(400).json({
                status: "ERROR",
                message: (0, parseZodError_1.parseZodError)(error)
            });
        }
        const { id: assessmentId } = data;
        const detailAssessment = new AssessmentDetailAdmin_1.AssessmentDetailForAdminService();
        const assessment = await detailAssessment.execute({ assessmentId });
        return res.json({ status: "SUCCESS", data: assessment });
    }
}
exports.AssessmentDetailForAdminController = AssessmentDetailForAdminController;
