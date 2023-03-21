"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users');
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + file.originalname;
        //cb(null, file.fieldname + '-' + uniqueSuffix)
        //const uniqueSuffix = Date.now() + file.originalname;
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/getAllUsersByUsername').post((req, res) => new user_controller_1.UserController().getAllUsersByUsername(req, res));
userRouter.route('/getAllActiveUsers').get((req, res) => new user_controller_1.UserController().getAllActiveUsers(req, res));
userRouter.route('/getAllActiveOrganisers').get((req, res) => new user_controller_1.UserController().getAllActiveOrganisers(req, res));
userRouter.route('/getAllWaitingUsers').get((req, res) => new user_controller_1.UserController().getAllWaitingUsers(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/setTemporaryPassword').post((req, res) => new user_controller_1.UserController().setTemporaryPassword(req, res));
userRouter.route('/sendMail').post((req, res) => new user_controller_1.UserController().sendMail(req, res));
userRouter.route("/addImage").post(upload.single("file"), (req, res) => new user_controller_1.UserController().addImage(req, res));
userRouter.route("/checkImageSize").post((req, res) => new user_controller_1.UserController().checkImageSize(req, res));
userRouter.route("/register").post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getUserImage').get((req, res) => new user_controller_1.UserController().getUserImage(req, res));
userRouter.route('/acceptRegistrationRequest').post((req, res) => new user_controller_1.UserController().acceptRegistrationRequest(req, res));
userRouter.route('/denyRegistrationRequest').post((req, res) => new user_controller_1.UserController().denyRegistrationRequest(req, res));
userRouter.route('/addNewUser').post((req, res) => new user_controller_1.UserController().addNewUser(req, res));
userRouter.route('/promoteParticipantToOrganiser').post((req, res) => new user_controller_1.UserController().promoteParticipantToOrganiser(req, res));
userRouter.route('/addWorkshopToList').post((req, res) => new user_controller_1.UserController().addWorkshopToList(req, res));
userRouter.route('/sendMailWorkshopCancelled').post((req, res) => new user_controller_1.UserController().sendMailWorkshopCancelled(req, res));
userRouter.route('/sendMailNewSpot').post((req, res) => new user_controller_1.UserController().sendMailNewSpot(req, res));
/*
userRouter.route('/testDatum').get(
    (req, res) => new UserController().testDatum(req, res)
)*/
userRouter.route('/updateUser').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route("/getImage").get((req, res) => new user_controller_1.UserController().getImage(req, res));
userRouter.route("/nekaTestMetoda").post((req, res) => new user_controller_1.UserController().nekaTestMetoda(req, res));
userRouter.route("/renameImage").get((req, res) => new user_controller_1.UserController().renameImage(req, res));
userRouter.route("/deleteImage").get((req, res) => new user_controller_1.UserController().deleteImage(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map