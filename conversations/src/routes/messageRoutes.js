const { addMessage, getMessages } = require("../controller/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.get("/:conversationId", getMessages);

module.exports = router;