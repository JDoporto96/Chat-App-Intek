const { newConversation, getConversations, deleteConversation, getSingleConversationData } = require("../controller/conversationController");

const router = require("express").Router();

router.post("/newconversation", newConversation);
router.get("/:userId", getConversations);
router.post("/deleteconv",deleteConversation);
router.get("/conversationData/:conversationId", getSingleConversationData)

module.exports = router;