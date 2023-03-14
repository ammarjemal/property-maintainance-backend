const router = require("express").Router();
const Message = require("../model/messageModel");
const messageController = require("../controller/messageController");


router.post("/messages", messageController.addMessage);
router.get("/messages/:conversationId", messageController.getMessages);
// router.get("/messages/:userId1/:userId2", messageController.getMessage);

module.exports = router;
