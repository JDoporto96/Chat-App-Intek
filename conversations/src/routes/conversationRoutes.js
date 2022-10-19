const { newConversation, getConversations } = require("../controller/conversationController");

const router = require("express").Router();

router.post("/newconversation", newConversation);
router.get("/:userId", getConversations);

module.exports = router;