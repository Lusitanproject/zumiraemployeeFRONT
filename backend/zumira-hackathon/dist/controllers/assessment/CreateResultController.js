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
exports.CreateResultController = void 0;
const zod_1 = require("zod");
const parseZodError_1 = require("../../utils/parseZodError");
const CreateResultService_1 = require("../../services/assessment/CreateResultService");
const assertPermissions_1 = require("../../utils/assertPermissions");
const CreateResultSchema = zod_1.z.object({
    assessmentId: zod_1.z.string().cuid(),
    answers: zod_1.z.array(zod_1.z.object({
        assessmentQuestionId: zod_1.z.string().uuid(),
        assessmentQuestionChoiceId: zod_1.z.string().uuid(),
    })),
});
class CreateResultController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assertPermissions_1.assertPermissions)(req.user, "answer-assessment");
            const { success, data, error } = CreateResultSchema.safeParse(req.body);
            if (!success)
                throw new Error((0, parseZodError_1.parseZodError)(error));
            const userId = req.user.id;
            const { assessmentId, answers } = data;
            const createResult = new CreateResultService_1.CreateResultService();
            const result = yield createResult.execute({ userId, assessmentId, answers });
            return res.json({ status: "SUCCESS", data: result });
        });
    }
}
exports.CreateResultController = CreateResultController;
