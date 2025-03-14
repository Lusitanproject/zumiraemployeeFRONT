"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailAssessmentController = void 0;
const zod_1 = require("zod");
const parseZodError_1 = require("../../utils/parseZodError");
const DetailAssessmentService_1 = require("../../services/assessment/DetailAssessmentService");
const assertPermissions_1 = require("../../utils/assertPermissions");
const CreateIdSchema = zod_1.z.object({
    id: zod_1.z.string().cuid(),
});
class DetailAssessmentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assertPermissions_1.assertPermissions)(req.user, "read-assessment");
            const { success, data, error } = CreateIdSchema.safeParse(req.params);
            if (!success)
                throw new Error((0, parseZodError_1.parseZodError)(error));
            const userId = req.user.id;
            const { id: assessmentId } = data;
            const detailAssessment = new DetailAssessmentService_1.DetailAssessmentService();
            const assessment = yield detailAssessment.execute({ userId, assessmentId });
            return res.json({ status: "SUCCESS", data: assessment });
        });
    }
}
exports.DetailAssessmentController = DetailAssessmentController;
