const { newConversation, getConversations, deleteConversation, getSingleConversationData } = require("../controller/conversationController");

const router = require("express").Router();

router.post("/", newConversation);
router.get("/myconvs/:userId", getConversations);
router.delete("/:id",deleteConversation);
router.get("/:id", getSingleConversationData)

module.exports = router;