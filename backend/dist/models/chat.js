"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Chat = new Schema({
    korisnik1: {
        type: String
    },
    korisnik2: {
        type: String
    },
    radionicaId: {
        type: Number
    },
    radionicaNaziv: {
        type: String
    },
    poruke: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Chat', Chat, 'chats');
//# sourceMappingURL=chat.js.map