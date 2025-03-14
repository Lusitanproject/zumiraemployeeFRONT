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
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../prisma"));
function getUserData(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                id: userId,
            },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user)
            throw new Error("User does not exist");
        return {
            id: user.id,
            role: user.role.slug,
            permissions: user.role.rolePermissions.map((p) => p.permission.slug),
        };
    });
}
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).end();
        }
        const [, token] = authToken.split(" ");
        try {
            // Validar o token
            const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            // Recuperar o id do token e armazenar numa variavel user dentro de req
            const userId = sub;
            req.user = yield getUserData(userId);
            return next();
        }
        catch (err) {
            return res.status(401).end();
        }
    });
}
