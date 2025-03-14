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
exports.CreateQuestionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateQuestionService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ description, assessmentId, index, psychologicalDimensionId, choices }) {
            const assessmentExists = yield prisma_1.default.assessment.findFirst({
                where: {
                    id: assessmentId,
                },
            });
            if (!assessmentExists)
                throw new Error("Assessment does not exist");
            const dimensionExists = yield prisma_1.default.psychologicalDimension.findFirst({
                where: {
                    id: psychologicalDimensionId,
                },
            });
            if (!dimensionExists)
                throw new Error("Psychological dimension does not exist");
            const question = yield prisma_1.default.assessmentQuestion.create({
                data: {
                    description,
                    index,
                    assessmentId,
                    psychologicalDimensionId,
                },
                select: {
                    id: true,
                    description: true,
                    assessmentId: true,
                    psychologicalDimensionId: true,
                },
            });
            yield prisma_1.default.assessmentQuestionChoice.createMany({
                data: choices.map((c) => ({
                    label: c.label,
                    value: c.value,
                    index: c.index,
                    assessmentQuestionId: question.id,
                })),
            });
            return question;
        });
    }
}
exports.CreateQuestionService = CreateQuestionService;
