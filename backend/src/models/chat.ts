import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Chat', Chat, 'chats');