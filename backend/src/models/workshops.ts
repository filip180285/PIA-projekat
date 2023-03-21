import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Radionica', Radionica, 'radionice');