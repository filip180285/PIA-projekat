"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshops_1 = __importDefault(require("../models/workshops"));
const user_1 = __importDefault(require("../models/user"));
const path = require("path");
const fs = require('fs');
class WorkshopController {
    constructor() {
        // ok
        this.getAllActiveWorkshops = (req, res) => {
            workshops_1.default.find({ status: "aktivna" }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ispitaj da li mijenja sta na frontu
        // dohvata aktivne i zavrsene(za top 5)
        // ok
        this.getAllWorkshops = (req, res) => {
            workshops_1.default.find({ $and: [{ status: { $ne: "otkazana" } }, { status: { $ne: "na cekanju" } }] }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // dohvata aktivne, zavrsene i otkazane radionice
        // na frontu se filtrira da li je ide u moje ili u ostale rad
        // ok
        this.getAllWorkshopsForOrganiser = (req, res) => {
            workshops_1.default.find({ status: { $ne: "na cekanju" } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ok
        this.getAllWaitingWorkshops = (req, res) => {
            workshops_1.default.find({ status: "na cekanju" }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ok
        this.getAllWorkshopsAbs = (req, res) => {
            workshops_1.default.find({}, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ok
        this.getAllWorkshopsById = (req, res) => {
            workshops_1.default.find({ id: { $in: JSON.parse(req.body.nizId) } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ok
        this.getWorkshopImage = (req, res) => {
            res.sendFile(path.join(__dirname, `../../uploads/workshops/${req.query.image}`));
        };
        // ok
        this.getAllAttendedWorkshopsForUser = (req, res) => {
            workshops_1.default.find({ id: { $in: JSON.parse(req.body.ids) } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        // ok
        this.getAllWorkshopsLikedByUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            //console.log(korisnickoIme)
            workshops_1.default.aggregate([{
                    $unwind: "$svidjanja"
                }, {
                    $match: { svidjanja: korisnickoIme }
                }]).exec((err, workshops) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("Lajkovao:")
                    //console.log(workshops)
                    res.json(workshops);
                }
            });
        };
        // ok
        this.getAllWorkshopsCommentedByUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            workshops_1.default.aggregate([
                //{ $project : { id : "$id", naziv:"$naziv", status:"$status" } },
                {
                    $unwind: "$komentari"
                }, {
                    $group: { _id: { korisnik: "$komentari.korisnik", radionica: "$id" }, brojKomentara: { $sum: 1 } }
                }
            ]).exec((err, workshops) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("Komentarisao:")
                    //console.log(workshops);
                    let niz = [];
                    workshops.forEach((e) => {
                        if (e._id.korisnik == korisnickoIme) {
                            niz.push(e._id.radionica);
                        }
                    });
                    //console.log(niz)
                    res.json(niz);
                }
            });
        };
        // ok
        this.updateWorkshopLikes = (req, res) => {
            let id = req.body.id;
            let svidjanja = JSON.parse(req.body.svidjanja);
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { svidjanja: svidjanja } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Svidjanja su ažurirana!");
                    res.json({ message: "Svidjanja su ažurirana!" });
                }
            });
        };
        // ok
        this.updateWorkshopComments = (req, res) => {
            let id = req.body.id;
            let komentari = JSON.parse(req.body.komentari);
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { komentari: komentari } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Komentari su ažurirani!");
                    res.json({ message: "Komentari su ažurirani!" });
                }
            });
        };
        // da bi ucesnik mogao povuci prijavu samo za aktivne radionice
        // i da bi admin provjerio da li ima prijava koje su za tekuce radionice
        // ok
        this.getAllWorkshopsAppliedByUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            console.log(korisnickoIme);
            workshops_1.default.aggregate([{
                    $unwind: "$prijavljeni"
                }, {
                    $match: { prijavljeni: korisnickoIme, status: "aktivna" }
                }]).exec((err, workshops) => {
                if (err)
                    console.log(err);
                else {
                    //console.log(workshops);
                    let niz = [];
                    workshops.forEach((e) => {
                        niz.push(e.id);
                    });
                    res.json(niz);
                }
            });
        };
        // ok
        this.updateWorkshopApplies = (req, res) => {
            let id = req.body.id;
            let prijavljeni = JSON.parse(req.body.prijavljeni);
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { prijavljeni: prijavljeni } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Prijave su ažurirane!");
                    res.json({ message: "Prijave su ažurirane!" });
                }
            });
        };
        // ok
        this.updateWorkshopWaitingList = (req, res) => {
            let id = req.body.id;
            let cekajuNa = JSON.parse(req.body.cekajuNa);
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { cekajuNa: cekajuNa } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Lista za cekanje je ažurirana!");
                    res.json({ message: "Lista za cekanje je ažurirana!" });
                }
            });
        };
        // ok
        this.addUserToApplies = (req, res) => {
            let id = req.body.id;
            let korisnickoIme = req.body.korisnickoIme;
            workshops_1.default.collection.updateOne({ 'id': id }, { $addToSet: { prijavljeni: korisnickoIme }, $inc: { kapacitet: -1 } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Uspešna prijava za radionicu!");
                    res.json({ message: "Uspešna prijava za radionicu!" });
                }
            });
        };
        // ok
        this.incCapByOne = (req, res) => {
            let id = req.body.id;
            workshops_1.default.collection.updateOne({ 'id': id }, { $inc: { kapacitet: 1 } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Kapacitet +1!");
                    res.json({ message: "Kapacitet +1!" });
                }
            });
        };
        // ok
        this.addUserToWaitingList = (req, res) => {
            let id = req.body.id;
            let korisnickoIme = req.body.korisnickoIme;
            workshops_1.default.collection.updateOne({ 'id': id }, { $addToSet: { cekajuNa: korisnickoIme } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Dodati ste na listu za čekanje!");
                    res.json({ message: "Dodati ste na listu za čekanje!" });
                }
            });
        };
        // ok
        this.addMainImage = (req, res) => {
            const file = req.file;
            if (!file) {
                console.log("No file");
            }
            else {
                let myArray = file.originalname.split(".");
                if (myArray[1] != "jpg" && myArray[1] != "png") {
                    try {
                        fs.unlinkSync(path.join(__dirname, "../../uploads/workshops/" + file.originalname));
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
        this.addGallery = (req, res) => {
            const files = req.files;
            if (!files) {
                console.log("No file");
            }
            else {
                let validImages = true;
                for (let i = 0; i < files.length; i++) {
                    let myArray = files[i].originalname.split(".");
                    if (myArray[1] != "jpg" && myArray[1] != "png") {
                        validImages = false;
                    }
                }
                if (validImages == false) {
                    for (let i = 0; i < files.length; i++) {
                        fs.unlink(path.join(__dirname, "../../uploads/workshops/" + files[i].originalname), (err) => {
                            if (err) {
                                console.log(err); // throw err
                            }
                            console.log("Deleted " + files[i].originalname + " successfully.");
                        });
                    }
                    res.json({ message: "Samo .png i .jpg fajlovi su dozvoljeni!" });
                }
                else
                    res.json(files);
            }
        };
        // ok
        this.addNewWorkshopSuggestion = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let organizator = req.body.organizator;
            let glavnaSlika = req.body.glavnaSlika;
            let mesto = req.body.mesto;
            let adresa = req.body.adresa;
            let datum = req.body.datum;
            let kratakOpis = req.body.kratakOpis;
            let dugOpis = req.body.dugOpis;
            let galerija = JSON.parse(req.body.galerija);
            let kapacitet = req.body.kapacitet;
            let myArray = glavnaSlika.split(".");
            let glavnaSlikaString = naziv + Date.now() + "." + myArray[1];
            fs.renameSync(path.join(__dirname, "../../uploads/workshops/" + glavnaSlika), path.join(__dirname, "../../uploads/workshops/" + glavnaSlikaString));
            let novaImenaSlika = [];
            for (let slika of galerija) {
                let myArray2 = slika.split(".");
                let novoImeSlike = myArray2[0] + Date.now() + "." + myArray2[1];
                novaImenaSlika.push(novoImeSlike);
                fs.rename(path.join(__dirname, "../../uploads/workshops/" + slika), path.join(__dirname, "../../uploads/workshops/" + novoImeSlike), function (err) {
                    if (err) {
                        console.log(err);
                    } //throw err
                });
            }
            let radionica = new workshops_1.default({
                id: id,
                naziv: naziv,
                status: "na cekanju",
                organizator: organizator,
                kapacitet: kapacitet,
                glavnaSlika: glavnaSlikaString,
                datum: datum,
                mesto: mesto,
                adresa: adresa,
                kratakOpis: kratakOpis,
                dugOpis: dugOpis,
                slike: novaImenaSlika,
                svidjanja: [],
                cekajuNa: [],
                komentari: [],
                prijavljeni: [],
            });
            radionica.save().then(radionica => {
                res.status(200).json({ 'message': 'Uspešno ste poslali predlog za radionicu!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom slanja zahteva predloga za radionicu!' });
            });
        };
        this.deleteWorkshop = (req, res) => {
            let id = req.body.id;
            let slike = JSON.parse(req.body.slike);
            // brisanje slika
            /*
            for (let i = 0; i < slike.length; i++) {
              fs.unlink(path.join(__dirname, "../../uploads/workshops/" + slike[i]), (err) => {
                if (err) {
                  console.log(err) // throw err
                }
                console.log("Deleted " + slike[i] + " successfully.");
              });
            }*/
            workshops_1.default.collection.deleteOne({ 'id': id }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Radionica je obrisana!");
                    res.json({ message: "Radionica je obrisana!" });
                }
            });
        };
        this.deleteWorkshopImages = (req, res) => {
            let slike = JSON.parse(req.body.slike);
            for (let i = 0; i < slike.length; i++) {
                fs.unlink(path.join(__dirname, "../../uploads/workshops/" + slike[i]), (err) => {
                    if (err) {
                        console.log(err); // throw err
                    }
                    console.log("Deleted " + slike[i] + " successfully.");
                });
            }
        };
        // ok
        this.acceptWorkshopSuggestion = (req, res) => {
            let id = req.body.id;
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { status: "aktivna" } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Predlog za radionicu je prihvacen!" });
                }
            });
        };
        // ok
        this.rejectWorkshopSuggestion = (req, res) => {
            let id = req.body.id;
            let slike = JSON.parse(req.body.slike);
            /*
            // brisanje slika
            for (let i = 0; i < slike.length; i++) {
              fs.unlink(path.join(__dirname, "../../uploads/workshops/" + slike[i]), (err) => {
                if (err) {
                  console.log(err) // throw err
                }
                console.log("Deleted " + slike[i] + " successfully.");
              });
            }*/
            workshops_1.default.collection.deleteOne({ 'id': id }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Predlog je odbijen!" });
                }
            });
        };
        this.addNewWorkshopAdmin = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let organizator = req.body.organizator;
            let glavnaSlika = req.body.glavnaSlika;
            let mesto = req.body.mesto;
            let adresa = req.body.adresa;
            let datum = req.body.datum;
            let kratakOpis = req.body.kratakOpis;
            let dugOpis = req.body.dugOpis;
            let galerija = JSON.parse(req.body.galerija);
            let kapacitet = req.body.kapacitet;
            let myArray = glavnaSlika.split(".");
            let glavnaSlikaString = naziv + Date.now() + "." + myArray[1];
            fs.renameSync(path.join(__dirname, "../../uploads/workshops/" + glavnaSlika), path.join(__dirname, "../../uploads/workshops/" + glavnaSlikaString));
            let novaImenaSlika = [];
            for (let slika of galerija) {
                let myArray2 = slika.split(".");
                let novoImeSlike = myArray2[0] + Date.now() + "." + myArray2[1];
                novaImenaSlika.push(novoImeSlike);
                fs.rename(path.join(__dirname, "../../uploads/workshops/" + slika), path.join(__dirname, "../../uploads/workshops/" + novoImeSlike), function (err) {
                    if (err) {
                        console.log(err);
                    } //throw err
                });
            }
            let radionica = new workshops_1.default({
                id: id,
                naziv: naziv,
                status: "aktivna",
                organizator: organizator,
                kapacitet: kapacitet,
                glavnaSlika: glavnaSlikaString,
                datum: datum,
                mesto: mesto,
                adresa: adresa,
                kratakOpis: kratakOpis,
                dugOpis: dugOpis,
                slike: novaImenaSlika,
                svidjanja: [],
                cekajuNa: [],
                komentari: [],
                prijavljeni: [],
            });
            radionica.save().then(radionica => {
                res.status(200).json({ 'message': 'Uspešno ste dodali novu radionicu!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom dodavanja nove radionice!' });
            });
        };
        // ok
        this.updateWorkshop = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let glavnaSlika = req.body.glavnaSlika;
            let staraGlavnaSlika = req.body.staraGlavnaSlika;
            let mesto = req.body.mesto;
            let adresa = req.body.adresa;
            let datum = req.body.datum;
            let kratakOpis = req.body.kratakOpis;
            let dugOpis = req.body.dugOpis;
            let galerija = JSON.parse(req.body.galerija);
            let staraGalerija = JSON.parse(req.body.staraGalerija);
            /*
            if (glavnaSlika != null) { // obrisemo staru glavnu
              try {
                fs.unlinkSync(path.join(__dirname, "../../uploads/workshops/" + staraGlavnaSlika));
                console.log("Deleted " + staraGlavnaSlika + " successfully.");
              } catch (error) {
                console.log(error);
              }
            }
        
            if (galerija != null) { // obrisemo staru galeriju
              for (let i = 0; i < staraGalerija.length; i++) {
                fs.unlink(path.join(__dirname, "../../uploads/workshops/" + staraGalerija[i]), (err) => {
                  if (err) {
                    console.log(err) // throw err
                  }
                  console.log("Deleted " + staraGalerija[i] + " successfully.");
                });
              }
            }
            */
            let glavnaSlikaString = staraGlavnaSlika;
            if (glavnaSlika != null) { // odgovarajuce preimenovanje nove slike
                let myArray = glavnaSlika.split(".");
                glavnaSlikaString = naziv + Date.now() + "." + myArray[1];
                fs.renameSync(path.join(__dirname, "../../uploads/workshops/" + glavnaSlika), path.join(__dirname, "../../uploads/workshops/" + glavnaSlikaString));
            }
            let novaImenaSlika = staraGalerija;
            if (galerija != null) {
                novaImenaSlika = [];
                for (let slika of galerija) {
                    let myArray2 = slika.split(".");
                    let novoImeSlike = myArray2[0] + Date.now() + "." + myArray2[1];
                    novaImenaSlika.push(novoImeSlike);
                    fs.rename(path.join(__dirname, "../../uploads/workshops/" + slika), path.join(__dirname, "../../uploads/workshops/" + novoImeSlike), function (err) {
                        if (err) {
                            console.log(err);
                        } //throw err
                    });
                }
            }
            workshops_1.default.collection.updateOne({ 'id': id }, {
                $set: {
                    naziv: naziv,
                    glavnaSlika: glavnaSlikaString,
                    mesto: mesto,
                    adresa: adresa,
                    datum: datum,
                    kratakOpis: kratakOpis,
                    dugOpis: dugOpis,
                    slike: novaImenaSlika
                }
            }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Radionica je ažurirana!" });
                }
            });
        };
        // ok
        this.endWorkshop = (req, res) => {
            let id = req.body.id;
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { status: "zavrsena" } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Kraj radionice!" });
                }
            });
        };
        this.cancelWorkshop = (req, res) => {
            let id = req.body.id;
            workshops_1.default.collection.updateOne({ 'id': id }, { $set: { status: "otkazana" } }, (err, success) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ message: "Radionica je otkazana!" });
                }
            });
        };
        // ok
        this.saveWorkshopAsJSON = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let id = req.body.id; // radi imena skice
            let skica = {
                naziv: req.body.naziv,
                glavnaSlika: req.body.glavnaSlika,
                datum: req.body.datum,
                mesto: req.body.mesto,
                adresa: req.body.adresa,
                kratakOpis: req.body.kratakOpis,
                dugOpis: req.body.dugOpis,
                slike: JSON.parse(req.body.slike)
            };
            let imeFajla = "" + req.body.naziv + id + ".json";
            let jsonData = JSON.stringify(skica, null, 2);
            fs.writeFile(path.join(__dirname, "../../uploads/sketches/" + imeFajla), jsonData, (err) => {
                if (err) {
                    console.log(err);
                    res.json({ message: "Greska pri dodavanju json fajla!" });
                }
                else {
                    user_1.default.collection.updateOne({ 'korisnickoIme': korisnickoIme }, { $push: { skice: imeFajla } }, (err, success) => {
                        if (err)
                            console.log(err);
                        else
                            console.log("Dodata skica!");
                    });
                    res.json({ message: "Uspesno dodata skica!" });
                }
            });
        };
        this.getSketchesForOrganiser = (req, res) => {
            let niz = [];
            let skice = JSON.parse(req.body.skice);
            for (let i = 0; i < skice.length; i++) {
                //console.log(i);
                try {
                    let obj = fs.readFileSync(path.join(__dirname, "../../uploads/sketches/" + skice[i]));
                    niz.push(JSON.parse(obj));
                }
                catch (err) {
                    console.error(err);
                }
            }
            res.json(niz);
        };
        // ok
        this.addBySketch = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let organizator = req.body.organizator;
            let glavnaSlika = req.body.glavnaSlika;
            let mesto = req.body.mesto;
            let adresa = req.body.adresa;
            let datum = req.body.datum;
            let kratakOpis = req.body.kratakOpis;
            let dugOpis = req.body.dugOpis;
            let galerija = JSON.parse(req.body.galerija);
            let kapacitet = req.body.kapacitet;
            let radionica = new workshops_1.default({
                id: id,
                naziv: naziv,
                status: "na cekanju",
                organizator: organizator,
                kapacitet: kapacitet,
                glavnaSlika: glavnaSlika,
                datum: datum,
                mesto: mesto,
                adresa: adresa,
                kratakOpis: kratakOpis,
                dugOpis: dugOpis,
                slike: galerija,
                svidjanja: [],
                cekajuNa: [],
                komentari: [],
                prijavljeni: [],
            });
            radionica.save().then(radionica => {
                res.status(200).json({ 'message': 'Uspešno ste poslali predlog za radionicu!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Došlo je do greške prilikom slanja zahteva predloga za radionicu!' });
            });
        };
        // testiranje cuvanja objekta u vidu json fajla
        this.jsonFile = (req, res) => {
            let obj = {
                id: 5,
                naziv: "nekaRadionica",
                mesto: "Beograd",
                slike: ["prva", "druga", "treca"]
            };
            let jsonData = JSON.stringify(obj, null, 2);
            fs.writeFile(path.join(__dirname, "../../uploads/sketches/obj.json"), jsonData, (err) => {
                if (err) {
                    console.log(err);
                    res.json({ message: "greskaaaa" });
                }
                else {
                    res.json({ message: "uspeh" });
                }
            });
        };
        this.jsonFileRead = (req, res) => {
            fs.readFile(path.join(__dirname, "../../uploads/sketches/obj.json"), "utf8", (err, jsonString) => {
                if (err) {
                    console.log("Error reading file from disk:", err);
                    res.json({ message: "greskaaaa" });
                }
                try {
                    const obj = JSON.parse(jsonString);
                    res.json(obj);
                    //console.log("Customer address is:", customer.address); // => "Customer address is: Infinity Loop Drive"
                }
                catch (err) {
                    console.log("Error parsing JSON string:", err);
                }
            });
        };
        // get File
        this.getFile = (req, res) => {
            res.json(path.join(__dirname, `../../uploads/workshops/${req.body.imeSlike}`));
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map