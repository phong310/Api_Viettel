const router = require("express").Router();
const UsersController = require("../controller/Users");
const middlewareController = require("../middleware/middlewareController")

router.get('/get-all', middlewareController.verifyToken, UsersController.getAllUser);
router.post('/create-new', UsersController.createNewUser);
router.put('/update/:id', UsersController.updateUsers);
router.delete('/:id', UsersController.deleteUser);
router.get('/search', UsersController.searchUserList)

module.exports = router