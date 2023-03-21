"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/workshops');
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + file.originalname;
        //cb(null, file.fieldname + '-' + uniqueSuffix)
        //const uniqueSuffix = Date.now() + file.originalname;
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
workshopRouter.route('/getAllActiveWorkshops').get((req, res) => new workshop_controller_1.WorkshopController().getAllActiveWorkshops(req, res));
workshopRouter.route('/getAllWorkshops').get((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshops(req, res));
workshopRouter.route('/getAllWaitingWorkshops').get((req, res) => new workshop_controller_1.WorkshopController().getAllWaitingWorkshops(req, res));
workshopRouter.route('/getAllWorkshopsAbs').get((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsAbs(req, res));
workshopRouter.route('/getAllWorkshopsById').post((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsById(req, res));
workshopRouter.route('/getWorkshopImage').get((req, res) => new workshop_controller_1.WorkshopController().getWorkshopImage(req, res));
workshopRouter.route('/getAllAttendedWorkshopsForUser').post((req, res) => new workshop_controller_1.WorkshopController().getAllAttendedWorkshopsForUser(req, res));
workshopRouter.route('/getAllWorkshopsLikedByUser').post((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsLikedByUser(req, res));
workshopRouter.route('/getAllWorkshopsCommentedByUser').post((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsCommentedByUser(req, res));
workshopRouter.route('/updateWorkshopLikes').post((req, res) => new workshop_controller_1.WorkshopController().updateWorkshopLikes(req, res));
workshopRouter.route('/updateWorkshopComments').post((req, res) => new workshop_controller_1.WorkshopController().updateWorkshopComments(req, res));
workshopRouter.route('/getAllWorkshopsAppliedByUser').post((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsAppliedByUser(req, res));
workshopRouter.route('/updateWorkshopApplies').post((req, res) => new workshop_controller_1.WorkshopController().updateWorkshopApplies(req, res));
workshopRouter.route('/updateWorkshopWaitingList').post((req, res) => new workshop_controller_1.WorkshopController().updateWorkshopWaitingList(req, res));
workshopRouter.route('/addUserToApplies').post((req, res) => new workshop_controller_1.WorkshopController().addUserToApplies(req, res));
workshopRouter.route('/addUserToWaitingList').post((req, res) => new workshop_controller_1.WorkshopController().addUserToWaitingList(req, res));
workshopRouter.route("/addMainImage").post(upload.single("file"), (req, res) => new workshop_controller_1.WorkshopController().addMainImage(req, res));
workshopRouter.route("/addGallery").post(upload.array("files"), (req, res) => new workshop_controller_1.WorkshopController().addGallery(req, res));
workshopRouter.route('/addNewWorkshopSuggestion').post((req, res) => new workshop_controller_1.WorkshopController().addNewWorkshopSuggestion(req, res));
workshopRouter.route('/deleteWorkshop').post((req, res) => new workshop_controller_1.WorkshopController().deleteWorkshop(req, res));
workshopRouter.route('/deleteWorkshopImages').post((req, res) => new workshop_controller_1.WorkshopController().deleteWorkshopImages(req, res));
workshopRouter.route('/acceptWorkshopSuggestion').post((req, res) => new workshop_controller_1.WorkshopController().acceptWorkshopSuggestion(req, res));
workshopRouter.route('/rejectWorkshopSuggestion').post((req, res) => new workshop_controller_1.WorkshopController().rejectWorkshopSuggestion(req, res));
workshopRouter.route('/addNewWorkshopAdmin').post((req, res) => new workshop_controller_1.WorkshopController().addNewWorkshopAdmin(req, res));
workshopRouter.route('/updateWorkshop').post((req, res) => new workshop_controller_1.WorkshopController().updateWorkshop(req, res));
workshopRouter.route('/getAllWorkshopsForOrganiser').get((req, res) => new workshop_controller_1.WorkshopController().getAllWorkshopsForOrganiser(req, res));
workshopRouter.route('/endWorkshop').post((req, res) => new workshop_controller_1.WorkshopController().endWorkshop(req, res));
workshopRouter.route('/cancelWorkshop').post((req, res) => new workshop_controller_1.WorkshopController().cancelWorkshop(req, res));
workshopRouter.route('/saveWorkshopAsJSON').post((req, res) => new workshop_controller_1.WorkshopController().saveWorkshopAsJSON(req, res));
workshopRouter.route('/getSketchesForOrganiser').post((req, res) => new workshop_controller_1.WorkshopController().getSketchesForOrganiser(req, res));
workshopRouter.route('/addBySketch').post((req, res) => new workshop_controller_1.WorkshopController().addBySketch(req, res));
workshopRouter.route('/incCapByOne').post((req, res) => new workshop_controller_1.WorkshopController().incCapByOne(req, res));
// json test
workshopRouter.route('/jsonFile').post((req, res) => new workshop_controller_1.WorkshopController().jsonFile(req, res));
workshopRouter.route('/jsonFileRead').post((req, res) => new workshop_controller_1.WorkshopController().jsonFileRead(req, res));
workshopRouter.route('/getFile').post((req, res) => new workshop_controller_1.WorkshopController().getFile(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.router.js.map