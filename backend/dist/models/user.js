"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    lozinkaTrajeDo: {
        type: Number
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    status: {
        type: String
    },
    telefon: {
        type: String
    },
    slika: {
        type: String
    },
    nazivOrganizacije: {
        type: String
    },
    adresaOrganizacije: {
        type: String
    },
    maticniBrojOrganizacije: {
        type: String
    },
    radionice: {
        type: Array
    },
    skice: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnici');
//# sourceMappingURL=user.js.map