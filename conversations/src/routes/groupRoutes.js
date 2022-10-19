const { deleteGroup,updateGroupName, addMembers, removeMembers,addAdmins, removeAdmins, showMyGroups, createGroupConversation} = require('../controller/groupController')
const router = require("express").Router();

router.post("/creategroup", createGroupConversation);
router.patch("/addmembers", addMembers);
router.patch("/removemembers", removeMembers);
router.patch("/addadmins", addAdmins);
router.patch("/removeadmins", removeAdmins);
router.patch("/updategroupname", updateGroupName);
router.delete("/deletegroup/:groupid",deleteGroup);
router.post("/mygroups", showMyGroups);

module.exports = router;