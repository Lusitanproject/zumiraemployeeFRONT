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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, role, companyId }) {
            const userExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (userExists)
                throw new Error("User already exists");
            const companyExists = yield prisma_1.default.company.findFirst({
                where: {
                    id: companyId,
                },
            });
            if (!companyExists)
                throw new Error("Company does not exist");
            const roleExists = yield prisma_1.default.role.findFirst({
                where: {
                    slug: role,
                },
            });
            if (!roleExists)
                throw new Error(`Role does not exist`);
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    roleId: roleExists.id,
                    companyId,
                },
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
