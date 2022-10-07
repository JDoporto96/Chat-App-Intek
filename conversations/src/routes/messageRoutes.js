const { addMessage, getMessages } = require("../controller/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsgs", getMessages);

module.exports = router;