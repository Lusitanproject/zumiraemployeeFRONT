"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFeedbackService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListFeedbackService {
    async execute(userId) {
        const recentFeedbacks = await prisma_1.default.assessmentFeedback.groupBy({
            by: ["assessmentId"],
            where: {
                userId,
            },
            _max: {
                createdAt: true,
            },
        });
        const validFeedbacks = recentFeedbacks
            .filter(({ _max }) => _max.createdAt !== null)
            .map(({ assessmentId, _max }) => ({
            assessmentId,
            createdAt: _max.createdAt,
        }));
        const feedbacks = await prisma_1.default.assessmentFeedback.findMany({
            where: {
                OR: validFeedbacks,
            },
            select: {
                id: true,
                text: true,
                assessment: {
                    select: {
                        title: true,
                        summary: true,
                        description: true,
                    },
                },
            },
        });
        return { items: feedbacks };
    }
}
exports.ListFeedbackService = ListFeedbackService;
