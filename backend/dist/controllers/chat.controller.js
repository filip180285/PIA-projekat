"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_1 = __importDefault(require("../models/chat"));
class ChatController {
    constructor() {
        // ok
        this.getAllChatsForParticipant = (req, res) => {
            let korisnik1 = req.body.korisnik1;
            chat_1.default.find({ korisnik1: korisnik1 }, (err, chats) => {
                if (err)
                    console.log(err);
                else
                    res.json(chats);
            });
        };
        // ok
        this.getAllChatsForOrganiser = (req, res) => {
            let radionicaId = req.body.radionicaId;
            let korisnik2 = req.body.korisnik2;
            chat_1.default.find({ korisnik2: korisnik2, radionicaId: radionicaId }, (err, chats) => {
                if (err)
                    console.log(err);
                else
                    res.json(chats);
            });
        };
        // ok
        this.getChatForParticipant = (req, res) => {
            let korisnik1 = req.body.korisnik1;
            let korisnik2 = req.body.korisnik2;
            let radionicaId = req.body.radionicaId;
            chat_1.default.findOne({ korisnik1: korisnik1, korisnik2: korisnik2, radionicaId: radionicaId }, (err, chat) => {
                if (err)
                    console.log(err);
                else
                    res.json(chat);
            });
        };
        // ok
        this.sendMessage = (req, res) => {
            let korisnik1 = req.body.korisnik1;
            let korisnik2 = req.body.korisnik2;
            let radionicaId = req.body.radionicaId;
            let autor = req.body.autor;
            let tekst = req.body.tekst;
            let vreme = req.body.vreme;
            let poruka = {
                autor: autor,
                tekst: tekst,
                vreme: vreme
            };
            chat_1.default.collection.updateOne({
                'korisnik1': korisnik1, 'korisnik2': korisnik2,
                'radionicaId': radionicaId
            }, { $push: { poruke: poruka } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "Uspešno poslata poruka!" });
            });
        };
        // ok
        this.createChat = (req, res) => {
            let chat = JSON.parse(req.body.chat);
            let newChat = new chat_1.default({
                korisnik1: chat.korisnik1,
                korisnik2: chat.korisnik2,
                radionicaId: chat.radionicaId,
                radionicaNaziv: chat.radionicaNaziv,
                poruke: chat.poruke
            });
            newChat.save().then(chat => {
                console.log("Dodat novi chat");
                res.status(200).json({ 'message': 'Uspešno ste dodali novi chat!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom dodavanja chata!' });
            });
        };
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map