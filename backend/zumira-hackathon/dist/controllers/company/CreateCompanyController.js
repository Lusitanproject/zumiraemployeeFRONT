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
exports.CreateCompanyController = void 0;
const zod_1 = require("zod");
const assertPermissions_1 = require("../../utils/assertPermissions");
const parseZodError_1 = require("../../utils/parseZodError");
const CreateCompanyService_1 = require("../../services/company/CreateCompanyService");
const CreateCompanySchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
class CreateCompanyController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assertPermissions_1.assertPermissions)(req.user, "manage-company");
            const { success, data, error } = CreateCompanySchema.safeParse(req.body);
            if (!success)
                throw new Error((0, parseZodError_1.parseZodError)(error));
            const { name, email } = data;
            const createCompany = new CreateCompanyService_1.CreateCompanyService();
            const company = yield createCompany.execute({ name, email });
            return res.json({ status: "SUCCESS", data: company });
        });
    }
}
exports.CreateCompanyController = CreateCompanyController;
