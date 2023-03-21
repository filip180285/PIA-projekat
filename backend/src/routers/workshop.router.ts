import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/workshops')
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + file.originalname;
    //cb(null, file.fieldname + '-' + uniqueSuffix)
    //const uniqueSuffix = Date.now() + file.originalname;
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

workshopRouter.route('/getAllActiveWorkshops').get(
  (req, res) => new WorkshopController().getAllActiveWorkshops(req, res)
)

workshopRouter.route('/getAllWorkshops').get(
  (req, res) => new WorkshopController().getAllWorkshops(req, res)
)

workshopRouter.route('/getAllWaitingWorkshops').get(
  (req, res) => new WorkshopController().getAllWaitingWorkshops(req, res)
)

workshopRouter.route('/getAllWorkshopsAbs').get(
  (req, res) => new WorkshopController().getAllWorkshopsAbs(req, res)
)

workshopRouter.route('/getAllWorkshopsById').post(
  (req, res) => new WorkshopController().getAllWorkshopsById(req, res)
)

workshopRouter.route('/getWorkshopImage').get(
  (req, res) => new WorkshopController().getWorkshopImage(req, res)
)

workshopRouter.route('/getAllAttendedWorkshopsForUser').post(
  (req, res) => new WorkshopController().getAllAttendedWorkshopsForUser(req, res)
)

workshopRouter.route('/getAllWorkshopsLikedByUser').post(
  (req, res) => new WorkshopController().getAllWorkshopsLikedByUser(req, res)
)

workshopRouter.route('/getAllWorkshopsCommentedByUser').post(
  (req, res) => new WorkshopController().getAllWorkshopsCommentedByUser(req, res)
)

workshopRouter.route('/updateWorkshopLikes').post(
  (req, res) => new WorkshopController().updateWorkshopLikes(req, res)
)

workshopRouter.route('/updateWorkshopComments').post(
  (req, res) => new WorkshopController().updateWorkshopComments(req, res)
)

workshopRouter.route('/getAllWorkshopsAppliedByUser').post(
  (req, res) => new WorkshopController().getAllWorkshopsAppliedByUser(req, res)
)

workshopRouter.route('/updateWorkshopApplies').post(
  (req, res) => new WorkshopController().updateWorkshopApplies(req, res)
)

workshopRouter.route('/updateWorkshopWaitingList').post(
  (req, res) => new WorkshopController().updateWorkshopWaitingList(req, res)
)

workshopRouter.route('/addUserToApplies').post(
  (req, res) => new WorkshopController().addUserToApplies(req, res)
)

workshopRouter.route('/addUserToWaitingList').post(
  (req, res) => new WorkshopController().addUserToWaitingList(req, res)
)

workshopRouter.route("/addMainImage").post(upload.single("file"), (req, res) =>
  new WorkshopController().addMainImage(req, res)
);

workshopRouter.route("/addGallery").post(upload.array("files"), (req, res) =>
  new WorkshopController().addGallery(req, res)
);

workshopRouter.route('/addNewWorkshopSuggestion').post(
  (req, res) => new WorkshopController().addNewWorkshopSuggestion(req, res)
)

workshopRouter.route('/deleteWorkshop').post(
  (req, res) => new WorkshopController().deleteWorkshop(req, res)
)

workshopRouter.route('/deleteWorkshopImages').post(
  (req, res) => new WorkshopController().deleteWorkshopImages(req, res)
)

workshopRouter.route('/acceptWorkshopSuggestion').post(
  (req, res) => new WorkshopController().acceptWorkshopSuggestion(req, res)
)

workshopRouter.route('/rejectWorkshopSuggestion').post(
  (req, res) => new WorkshopController().rejectWorkshopSuggestion(req, res)
)

workshopRouter.route('/addNewWorkshopAdmin').post(
  (req, res) => new WorkshopController().addNewWorkshopAdmin(req, res)
)

workshopRouter.route('/updateWorkshop').post(
  (req, res) => new WorkshopController().updateWorkshop(req, res)
)

workshopRouter.route('/getAllWorkshopsForOrganiser').get(
  (req, res) => new WorkshopController().getAllWorkshopsForOrganiser(req, res)
)

workshopRouter.route('/endWorkshop').post(
  (req, res) => new WorkshopController().endWorkshop(req, res)
)

workshopRouter.route('/cancelWorkshop').post(
  (req, res) => new WorkshopController().cancelWorkshop(req, res)
)

workshopRouter.route('/saveWorkshopAsJSON').post(
  (req, res) => new WorkshopController().saveWorkshopAsJSON(req, res)
)

workshopRouter.route('/getSketchesForOrganiser').post(
  (req, res) => new WorkshopController().getSketchesForOrganiser(req, res)
)

workshopRouter.route('/addBySketch').post(
  (req, res) => new WorkshopController().addBySketch(req, res)
)

workshopRouter.route('/incCapByOne').post(
  (req, res) => new WorkshopController().incCapByOne(req, res)
)

// json test
workshopRouter.route('/jsonFile').post(
  (req, res) => new WorkshopController().jsonFile(req, res)
)

workshopRouter.route('/jsonFileRead').post(
  (req, res) => new WorkshopController().jsonFileRead(req, res)
)

workshopRouter.route('/getFile').post(
  (req, res) => new WorkshopController().getFile(req, res)
)


export default workshopRouter;