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
exports.ListPsychologicalDimensionsController = void 0;
const ListPsychologicalDimensionsService_1 = require("../../services/psychologicalDimension/ListPsychologicalDimensionsService");
class ListPsychologicalDimensionsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listDimensions = new ListPsychologicalDimensionsService_1.ListPsychologicalDimensionsService();
            const dimensions = yield listDimensions.execute();
            return res.json({ status: "SUCCESS", data: dimensions });
        });
    }
}
exports.ListPsychologicalDimensionsController = ListPsychologicalDimensionsController;
