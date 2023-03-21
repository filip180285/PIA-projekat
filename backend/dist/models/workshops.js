"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Radionica = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    status: {
        type: String
    },
    organizator: {
        type: String
    },
    kapacitet: {
        type: Number
    },
    glavnaSlika: {
        type: String
    },
    datum: {
        type: Number
    },
    mesto: {
        type: String
    },
    adresa: {
        type: String
    },
    kratakOpis: {
        type: String
    },
    dugOpis: {
        type: String
    },
    slike: {
        type: Array
    },
    svidjanja: {
        type: Array
    },
    cekajuNa: {
        type: Array
    },
    komentari: {
        type: Array
    },
    prijavljeni: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Radionica', Radionica, 'radionice');
//# sourceMappingURL=workshops.js.map