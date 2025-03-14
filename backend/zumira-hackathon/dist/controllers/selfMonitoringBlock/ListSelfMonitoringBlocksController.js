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
exports.ListSelfMonitoringBlocksController = void 0;
const ListSelfMonitoringBlocksService_1 = require("../../services/selfMonitoringBlock/ListSelfMonitoringBlocksService");
class ListSelfMonitoringBlocksController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listBlocks = new ListSelfMonitoringBlocksService_1.ListSelfMonitoringBlocksService();
            const blocks = yield listBlocks.execute();
            return res.json({ status: "SUCCESS", data: blocks });
        });
    }
}
exports.ListSelfMonitoringBlocksController = ListSelfMonitoringBlocksController;
