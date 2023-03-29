const { deleteGroup,showMyGroups, createGroupConversation, updateGroup} = require('../controller/groupController')
const router = require("express").Router();

router.post("/", createGroupConversation);
router.patch("/:id", updateGroup);
router.delete("/:id",deleteGroup);
router.get("/mygroups/:userId", showMyGroups);

module.exports = router;