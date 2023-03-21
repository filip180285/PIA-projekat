import express from 'express';
import { ChatController } from '../controllers/chat.controller';
const chatRouter = express.Router();

chatRouter.route('/getAllChatsForParticipant').post(
  (req, res) => new ChatController().getAllChatsForParticipant(req, res)
)

chatRouter.route('/getAllChatsForOrganiser').post(
  (req, res) => new ChatController().getAllChatsForOrganiser(req, res)
)

chatRouter.route('/getChatForParticipant').post(
  (req, res) => new ChatController().getChatForParticipant(req, res)
)

chatRouter.route('/sendMessage').post(
  (req, res) => new ChatController().sendMessage(req, res)
)

chatRouter.route('/createChat').post(
  (req, res) => new ChatController().createChat(req, res)
)

export default chatRouter;