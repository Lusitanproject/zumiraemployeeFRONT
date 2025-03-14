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
exports.DetailAssessmentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class DetailAssessmentService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, assessmentId }) {
            var _b;
            const queryResults = yield prisma_1.default.$queryRaw(client_1.Prisma.sql `
            SELECT a.id, a.title, a.description, 
                jsonb_build_object(
                    'id', q.id, 'description', q.description, 'index', q.index, 
                    'choice', jsonb_build_object('id', c.id, 'label', c.label, 'value', c.value, 'index', c.index)
                ) as question,
                MAX(ans.created_at) AS "lastCompleted"
            FROM assessments a
            JOIN assessment_questions q ON a.id = q.assessment_id
            JOIN assessment_question_choices c ON q.id = c.assessment_question_id
            LEFT JOIN assessment_question_answers ans ON q.id = ans.assessment_question_id AND ans.user_id = ${userId}
            WHERE assessment_id = ${assessmentId}
            GROUP BY a.id, a.title, a.description, q.id, q.description, c.id, c.label, c.value
            ORDER BY q.index ASC, c.index ASC
        `);
            if (queryResults.length === 0)
                throw new Error("Assessment does not exist");
            const assessment = {
                id: queryResults[0].id,
                title: queryResults[0].title,
                description: queryResults[0].description,
                questions: [],
                lastCompleted: null,
            };
            for (const result of queryResults) {
                // Atualizar last completed
                assessment.lastCompleted = (_b = result.lastCompleted) !== null && _b !== void 0 ? _b : assessment.lastCompleted;
                // Atualizar questions
                let question = assessment.questions.find((q) => q.id === result.question.id);
                if (!question) {
                    question = {
                        id: result.question.id,
                        description: result.question.description,
                        index: result.question.index,
                        choices: [],
                    };
                    assessment.questions.push(question);
                }
                // Atualizar choices
                const choice = {
                    id: result.question.choice.id,
                    label: result.question.choice.label,
                    value: result.question.choice.value,
                    index: result.question.choice.index,
                };
                question.choices.push(choice);
            }
            return assessment;
        });
    }
}
exports.DetailAssessmentService = DetailAssessmentService;
