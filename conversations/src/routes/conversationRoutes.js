const { newConversation, getConversations, deleteConversation } = require("../controller/conversationController");

const router = require("express").Router();

router.post("/newconversation", newConversation);
router.get("/:userId", getConversations);
router.post("/deleteconv",deleteConversation);

module.exports = router;