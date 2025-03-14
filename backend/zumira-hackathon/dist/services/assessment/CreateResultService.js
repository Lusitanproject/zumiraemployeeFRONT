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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResultService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
function allQuestionsExist(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = yield prisma_1.default.assessmentQuestion.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            select: {
                id: true,
            },
        });
        for (const id of ids) {
            if (!questions.some((q) => q.id === id))
                return false;
        }
        return true;
    });
}
function allChoicesExist(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = yield prisma_1.default.assessmentQuestionChoice.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            select: {
                id: true,
            },
        });
        for (const id of ids) {
            if (!choices.some((c) => c.id === id))
                return false;
        }
        return true;
    });
}
class CreateResultService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, assessmentId, answers }) {
            const userExists = yield prisma_1.default.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!userExists)
                throw new Error("User does not exist");
            const assessmentExists = yield prisma_1.default.assessment.findFirst({
                where: {
                    id: assessmentId,
                },
            });
            if (!assessmentExists)
                throw new Error("Assessment does not exist");
            if (!allQuestionsExist(answers.map((a) => a.assessmentQuestionId))) {
                throw new Error("One or more questions do not exist");
            }
            if (!allChoicesExist(answers.map((a) => a.assessmentQuestionChoiceId))) {
                throw new Error("One or more choices do not exist");
            }
            const result = yield prisma_1.default.assessmentResult.create({
                data: {
                    userId,
                    assessmentId,
                },
                select: {
                    id: true,
                    userId: true,
                    assessmentId: true,
                },
            });
            yield prisma_1.default.assessmentQuestionAnswer.createMany({
                data: answers.map((a) => ({
                    userId: userId,
                    assessmentQuestionId: a.assessmentQuestionId,
                    assessmentQuestionChoiceId: a.assessmentQuestionChoiceId,
                    assessmentResultId: result.id,
                })),
            });
            return result;
        });
    }
}
exports.CreateResultService = CreateResultService;
