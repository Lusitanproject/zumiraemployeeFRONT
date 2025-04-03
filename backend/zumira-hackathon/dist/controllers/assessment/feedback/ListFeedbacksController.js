"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFeedbacksController = void 0;
const ListFeedbacksService_1 = require("../../../services/assessment/feedback/ListFeedbacksService");
class ListFeedbacksController {
    async handle(req, res) {
        const userId = req.user.id;
        const ListFeedbackss = new ListFeedbacksService_1.ListFeedbacksService();
        const data = await ListFeedbackss.execute(userId);
        return res.json({ status: "SUCCESS", data: data });
    }
}
exports.ListFeedbacksController = ListFeedbacksController;
