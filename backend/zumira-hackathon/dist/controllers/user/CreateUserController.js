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
exports.CreateUserController = void 0;
const zod_1 = require("zod");
const assertPermissions_1 = require("../../utils/assertPermissions");
const parseZodError_1 = require("../../utils/parseZodError");
const CreateUserService_1 = require("../../services/user/CreateUserService");
const CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(["user", "company", "admin"]),
    companyId: zod_1.z.string().cuid().optional(),
});
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, assertPermissions_1.assertPermissions)(req.user, "manage-users");
            const { success, data, error } = CreateUserSchema.safeParse(req.body);
            if (!success)
                throw new Error((0, parseZodError_1.parseZodError)(error));
            const { name, email, role, companyId } = data;
            if (role === "admin" && req.user.role !== "admin")
                throw new Error("Only admins can create new admin users");
            const createUser = new CreateUserService_1.CreateUserService();
            const user = yield createUser.execute({ name, email, role, companyId });
            return res.json({ status: "SUCCESS", data: user });
        });
    }
}
exports.CreateUserController = CreateUserController;
