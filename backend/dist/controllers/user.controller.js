"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require('fs');
class UserController {
    constructor() {
        // ok
        this.login = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka, status: "aktivan" }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        // ok
        this.getUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        // vraca sve(aktivan, neaktivan, na cekanju)
        // ok
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        // ok
        this.getAllActiveUsers = (req, res) => {
            user_1.default.find({ status: "aktivan" }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        // ok
        this.getAllActiveOrganisers = (req, res) => {
            user_1.default.find({ tip: "organizator", status: "aktivan" }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    //console.log(users);
                    res.json(users);
                }
            });
        };
        this.getAllWaitingUsers = (req, res) => {
            user_1.default.find({ status: "na cekanju" }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        // ok
        this.changePassword = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let novaLozinka = req.body.novaLozinka;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { lozinka: novaLozinka, lozinkaTrajeDo: -1 } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "Uspešna promena lozinke!" });
            });
        };
        // ok
        this.setTemporaryPassword = (req, res) => {
            let mejl = req.body.mejl;
            let privremenaLozinka = req.body.privremenaLozinka;
            let trajanje = req.body.trajanje;
            user_1.default.collection.updateOne({ 'mejl': mejl }, { $set: { lozinka: privremenaLozinka, lozinkaTrajeDo: trajanje } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    let datum = new Date(trajanje);
                    //console.log(datum.toLocaleString('en-GB'));
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'jovicaperic84@gmail.com',
                            pass: 'kuxlgezoylkouqww'
                        }
                    });
                    var mailOptions = {
                        from: 'jovicaperic84@gmail.com',
                        to: mejl,
                        subject: 'Privremena lozinka',
                        text: 'Vaša nova lozinka je: ' + privremenaLozinka + ' i važi do ' + datum.toLocaleString('en-GB')
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                            res.json({ message: "Privremena lozinka vam je poslata na mejl!" });
                        }
                    });
                }
            });
        };
        // ok
        this.addImage = (req, res) => {
            const file = req.file;
            if (!file) {
                console.log("No file");
            }
            else {
                let myArray = file.originalname.split(".");
                if (myArray[1] != "jpg" && myArray[1] != "png") {
                    try {
                        fs.unlinkSync(path.join(__dirname, "../../uploads/users/" + file.originalname));
                        console.log("Deleted " + file.originalname + " successfully.");
                    }
                    catch (error) {
                        console.log(error);
                    }
                    res.json({ message: "Samo .png i .jpg fajlovi su dozvoljeni!" });
                }
                else
                    res.send(file);
            }
        };
        // ok
        this.checkImageSize = (req, res) => {
            let imeSlike = req.body.imeSlike;
            const sizeOf = require('image-size');
            const dimensions = sizeOf(path.join(__dirname, "../../uploads/users/" + imeSlike));
            console.log(dimensions.width, dimensions.height);
            if (dimensions.width < 100 || dimensions.height < 100 || dimensions.width > 300 || dimensions.height > 300) {
                try {
                    fs.unlinkSync(path.join(__dirname, "../../uploads/users/" + imeSlike));
                    console.log("Deleted " + imeSlike + " successfully.");
                }
                catch (error) {
                    console.log(error);
                }
                res.json({ message: "Slika mora biti izmedju 100x100 i 300x300 px!" });
            }
            else
                res.json({ message: "OK" });
        };
        // ok
        this.register = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            let telefon = req.body.telefon;
            let mejl = req.body.mejl;
            let nazivOrg = req.body.nazivOrg;
            let adresaOrg = req.body.adresaOrg;
            let matBrOrg = req.body.matBrOrg;
            let slika = req.body.slika;
            let slikaString = "";
            let lozinkaTrajeDo = -1;
            let radionice = [];
            let tip = "ucesnik";
            if (nazivOrg != "") {
                tip = "organizator";
            }
            if (slika != null) {
                let myArray = slika.split(".");
                slikaString = korisnickoIme + Date.now() + "." + myArray[1];
                fs.renameSync(path.join(__dirname, "../../uploads/users/" + slika), path.join(__dirname, "../../uploads/users/" + slikaString));
            }
            let korisnik = new user_1.default({
                ime: ime,
                prezime: prezime,
                korisnickoIme: korisnickoIme,
                lozinka: lozinka,
                lozinkaTrajeDo: lozinkaTrajeDo,
                telefon: telefon,
                mejl: mejl,
                nazivOrganizacije: nazivOrg,
                adresaOrganizacije: adresaOrg,
                maticniBrojOrganizacije: matBrOrg,
                tip: tip,
                slika: slikaString,
                status: "na cekanju",
                radionice: radionice
            });
            korisnik.save().then(korisnik => {
                res.status(200).json({ 'message': 'Uspešno ste poslali zahtev za registraciju kao ' + tip + "!" });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom slanja zahteva za registraciju!' });
            });
        };
        // ok
        this.getUserImage = (req, res) => {
            res.sendFile(path.join(__dirname, `../../uploads/users/${req.query.image}`));
        };
        // ok
        this.acceptRegistrationRequest = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { status: "aktivan" } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "Zahtev za registraciju je prihvaćen!" });
            });
        };
        // brisanje slike vrv nije neophodno
        // ok
        this.denyRegistrationRequest = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            // let slika = req.body.slika;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { status: "neaktivan" } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Zahtev za registraciju je odbijen!" });
                }
            });
        };
        // ok
        this.addNewUser = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            let telefon = req.body.telefon;
            let mejl = req.body.mejl;
            let nazivOrg = req.body.nazivOrg;
            let adresaOrg = req.body.adresaOrg;
            let matBrOrg = req.body.matBrOrg;
            let slika = req.body.slika;
            let slikaString = "";
            let lozinkaTrajeDo = -1;
            let radionice = [];
            let tip = "ucesnik";
            if (nazivOrg != "") {
                tip = "organizator";
            }
            if (slika != null) {
                let myArray = slika.split(".");
                slikaString = korisnickoIme + Date.now() + "." + myArray[1];
                fs.renameSync(path.join(__dirname, "../../uploads/users/" + slika), path.join(__dirname, "../../uploads/users/" + slikaString));
            }
            let korisnik = new user_1.default({
                ime: ime,
                prezime: prezime,
                korisnickoIme: korisnickoIme,
                lozinka: lozinka,
                lozinkaTrajeDo: lozinkaTrajeDo,
                telefon: telefon,
                mejl: mejl,
                nazivOrganizacije: nazivOrg,
                adresaOrganizacije: adresaOrg,
                maticniBrojOrganizacije: matBrOrg,
                tip: tip,
                slika: slikaString,
                status: "aktivan",
                radionice: radionice
            });
            korisnik.save().then(korisnik => {
                res.status(200).json({ 'message': 'Uspešno ste dodali novog korisnika!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom dodavanja korisnika!' });
            });
        };
        // ok
        this.updateUser = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            let telefon = req.body.telefon;
            let mejl = req.body.mejl;
            let nazivOrg = req.body.nazivOrg;
            let adresaOrg = req.body.adresaOrg;
            let matBrOrg = req.body.matBrOrg;
            let slika = req.body.slika;
            let staraSlika = req.body.staraSlika;
            if (slika != null && staraSlika != '') {
                try {
                    fs.unlinkSync(path.join(__dirname, "../../uploads/users/" + staraSlika));
                    console.log("Deleted " + staraSlika + " successfully.");
                }
                catch (error) {
                    console.log(error);
                }
            }
            let slikaString = staraSlika;
            if (slika != null) {
                let myArray = slika.split(".");
                slikaString = korisnickoIme + Date.now() + "." + myArray[1];
                fs.renameSync(path.join(__dirname, "../../uploads/users/" + slika), path.join(__dirname, "../../uploads/users/" + slikaString));
            }
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, {
                $set: {
                    ime: ime,
                    prezime: prezime,
                    telefon: telefon,
                    nazivOrganizacije: nazivOrg,
                    adresaOrganizacije: adresaOrg,
                    maticniBrojOrganizacije: matBrOrg,
                    slika: slikaString
                }
            }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Korisnik je ažuriran!" });
                }
            });
        };
        this.getAllUsersByUsername = (req, res) => {
            user_1.default.find({ korisnickoIme: { $in: JSON.parse(req.body.nizImena) } }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        // ok
        this.promoteParticipantToOrganiser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { tip: "organizator" } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Korisnik je promovisan u organizatora!" });
                }
            });
        };
        // ok
        this.addWorkshopToList = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let radionicaId = req.body.radionicaId;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $push: { radionice: radionicaId } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "Radionica dodata u ucesnikovu listu!" });
            });
        };
        // ok
        this.sendMailWorkshopCancelled = (req, res) => {
            let mejl = req.body.mejl;
            let radionica = req.body.radionica;
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'jovicaperic84@gmail.com',
                    pass: 'kuxlgezoylkouqww'
                }
            });
            var mailOptions = {
                from: 'jovicaperic84@gmail.com',
                to: mejl,
                subject: 'Otkazana radionica',
                text: 'Radionica ' + radionica + ' je otkazana!'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                    res.json({ message: "Mejl je poslat!" });
                }
            });
        };
        // ok
        this.sendMailNewSpot = (req, res) => {
            let mejl = req.body.mejl;
            let radionica = req.body.radionica;
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'jovicaperic84@gmail.com',
                    pass: 'kuxlgezoylkouqww'
                }
            });
            var mailOptions = {
                from: 'jovicaperic84@gmail.com',
                to: mejl,
                subject: 'Slobodno mesto',
                text: "Oslobodilo se jedno mesto za radionicu " + radionica
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                    res.json({ message: "Mejl je poslat!" });
                }
            });
        };
        /*
        testDatum = (req: express.Request, res: express.Response) => {
          const time: Number = Date.now();
          res.json(time)
      }*/
        // ok
        this.deleteUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { status: "neaktivan" } }, (err, success) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "Korisnik je obrisan!" });
            });
        };
        this.nekaTestMetoda = (req, res) => {
            let ime = req.body.ime;
            if (ime == null) {
                console.log("nije poslato");
            }
            else {
                console.log("poslato");
            }
            res.json({ message: "OK" });
        };
        this.sendMail = (req, res) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'jovicaperic84@gmail.com',
                    pass: 'kuxlgezoylkouqww'
                }
            });
            var mailOptions = {
                from: 'jovicaperic84@gmail.com',
                to: 'filipkojic48@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        };
        this.getImage = (req, res) => {
            let indexPath = path.join(__dirname, "../../uploads/slika.jpg");
            res.sendFile(indexPath);
        };
        this.renameImage = (req, res) => {
            fs.renameSync(path.join(__dirname, "../../uploads/users/logo.png"), path.join(__dirname, "../../uploads/users/novoIme.png"));
            res.json({ message: "okkk" });
        };
        this.deleteImage = (req, res) => {
            fs.unlink(path.join(__dirname, "../../uploads/slika.jpg"), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Delete File successfully.");
                res.json("Deleted");
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map