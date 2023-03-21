"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const chatRouter = express_1.default.Router();
chatRouter.route('/getAllChatsForParticipant').post((req, res) => new chat_controller_1.ChatController().getAllChatsForParticipant(req, res));
chatRouter.route('/getAllChatsForOrganiser').post((req, res) => new chat_controller_1.ChatController().getAllChatsForOrganiser(req, res));
chatRouter.route('/getChatForParticipant').post((req, res) => new chat_controller_1.ChatController().getChatForParticipant(req, res));
chatRouter.route('/sendMessage').post((req, res) => new chat_controller_1.ChatController().sendMessage(req, res));
chatRouter.route('/createChat').post((req, res) => new chat_controller_1.ChatController().createChat(req, res));
exports.default = chatRouter;
//# sourceMappingURL=chat.router.js.map