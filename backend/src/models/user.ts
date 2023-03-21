import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');