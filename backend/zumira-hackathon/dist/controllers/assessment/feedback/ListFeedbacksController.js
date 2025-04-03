"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFeedbackController = void 0;
const ListFeedbacksService_1 = require("../../../services/assessment/feedback/ListFeedbacksService");
class ListFeedbackController {
    async handle(req, res) {
        const userId = req.user.id;
        const listFeedbacks = new ListFeedbacksService_1.ListFeedbackService();
        const data = await listFeedbacks.execute(userId);
        return res.json({ status: "SUCCESS", data: data });
    }
}
exports.ListFeedbackController = ListFeedbackController;
