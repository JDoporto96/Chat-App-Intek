const { deleteGroup,showMyGroups, createGroupConversation, updateGroup} = require('../controller/groupController')
const router = require("express").Router();

router.post("/creategroup", createGroupConversation);
router.patch("/updategroup", updateGroup);
router.delete("/deletegroup/:groupid",deleteGroup);
router.get("/mygroups/:userId", showMyGroups);

module.exports = router;