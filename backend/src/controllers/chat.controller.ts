import * as express from 'express';
import Chat from '../models/chat';

export class ChatController {
  // ok
  getAllChatsForParticipant = (req: express.Request, res: express.Response) => {
    let korisnik1 = req.body.korisnik1;
    Chat.find({ korisnik1: korisnik1 }, (err, chats) => {
      if (err) console.log(err);
      else res.json(chats)
    })
  }

  // ok
  getAllChatsForOrganiser = (req: express.Request, res: express.Response) => {
    let radionicaId = req.body.radionicaId;
    let korisnik2 = req.body.korisnik2;
    Chat.find({ korisnik2: korisnik2, radionicaId: radionicaId }, (err, chats) => {
      if (err) console.log(err);
      else res.json(chats)
    })
  }

  // ok
  getChatForParticipant = (req: express.Request, res: express.Response) => {
    let korisnik1 = req.body.korisnik1;
    let korisnik2 = req.body.korisnik2;
    let radionicaId = req.body.radionicaId;
    Chat.findOne({ korisnik1: korisnik1, korisnik2: korisnik2, radionicaId: radionicaId }, (err, chat) => {
      if (err) console.log(err);
      else res.json(chat)
    })
  }

  // ok
  sendMessage = (req: express.Request, res: express.Response) => {
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

    Chat.collection.updateOne({
      'korisnik1': korisnik1, 'korisnik2': korisnik2,
      'radionicaId': radionicaId
    }, { $push: { poruke: poruka } }, (err, success) => {
      if (err) console.log(err);
      else res.json({ message: "Uspešno poslata poruka!" })
    })
  }

  // ok
  createChat = (req: express.Request, res: express.Response) => {
    let chat = JSON.parse(req.body.chat);

    let newChat = new Chat({
      korisnik1: chat.korisnik1,
      korisnik2: chat.korisnik2,
      radionicaId: chat.radionicaId,
      radionicaNaziv: chat.radionicaNaziv,
      poruke: chat.poruke
    });

    newChat.save().then(chat => {
      console.log("Dodat novi chat")
      res.status(200).json({ 'message': 'Uspešno ste dodali novi chat!' });
    }).catch(err => {
      res.status(400).json({ 'message': 'Došlo je do greške prilikom dodavanja chata!' });
    })
  }
}