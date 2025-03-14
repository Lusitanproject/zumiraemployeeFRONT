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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, code }) {
            if (!email || !code)
                throw new Error("Required data is missing");
            const user = yield prisma_1.default.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    role: true,
                },
            });
            if (!user)
                throw new Error("Email is not registered");
            const storedCode = yield prisma_1.default.authCode.findFirst({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    expiresAt: "desc",
                },
            });
            if (!storedCode)
                throw new Error("No code was sent");
            if (storedCode.expiresAt < new Date())
                throw new Error("Code is expired");
            if (storedCode.code !== code)
                throw new Error("Incorrect code");
            const token = (0, jsonwebtoken_1.sign)({
                email: user.email,
            }, process.env.JWT_SECRET, {
                subject: String(user.id),
                expiresIn: "30d",
            });
            const now = new Date().getTime();
            const expiresAt = new Date(now + 1000 * 60 * 60 * 24 * 30); // Expiração em 30 dias
            console.log(`Authenticated user ${email}`);
            return {
                name: user.name,
                role: user.role.slug,
                token: token,
                expiresAt: expiresAt,
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
