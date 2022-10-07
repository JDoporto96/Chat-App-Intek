const { createGroup, deleteGroup,updateGroupName, addMembers, removeMember,addAdmins, removeAdmin, showMyGroups} = require('../controller/groupController')
const router = require("express").Router();

router.post("/creategroup", createGroup);
router.patch("/addmembers", addMembers);
router.patch("/removemember", removeMember);
router.patch("/addadmins", addAdmins);
router.patch("/removeadmin", removeAdmin);
router.patch("/updategroupname", updateGroupName);
router.delete("/deletegroup/:groupid",deleteGroup);
router.post("/mygroups", showMyGroups);

module.exports = router;