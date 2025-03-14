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
exports.ListAssessmentsService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../prisma"));
class ListAssessmentsService {
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.default.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!userExists)
                throw new Error("User does not exist");
            const assessments = yield prisma_1.default.$queryRaw(client_1.Prisma.sql `
            SELECT a.id, a.title, a.summary, 
                jsonb_build_object('id', s.id, 'name', s.name) AS "scale", 
                jsonb_build_object('id', smb.id, 'title', smb.title) AS "selfMonitoring",
                MAX(ans.created_at) AS "lastCompleted"
            
            FROM assessments a 

            -- Obter info da scale
            JOIN assessment_scales s ON a.assessment_scale_id = s.id

            -- Obter info do self monitoring block
            JOIN self_monitoring_scales sms ON s.id = sms.assessment_scale_id
            JOIN self_monitoring_blocks smb ON sms.self_monitoring_id = smb.id
            
            -- Obter respostas para lastCompleted
            LEFT JOIN assessment_questions q ON a.id = q.assessment_id
            LEFT JOIN assessment_question_answers ans ON q.id = ans.assessment_question_id AND ans.user_id = ${userId}

            GROUP BY a.id, a.title, a.summary, s.id, s.name, smb.id, smb.title
        `);
            return { assessments };
        });
    }
}
exports.ListAssessmentsService = ListAssessmentsService;
