import express from "express";
const router = express.Router();
import { authorize } from '../middlewares/rbacRole-middleware';

const userController = require('../controllers/userController')

router.get('/me',            userController.getOwnInfo);
router.get('/:userId',      authorize(['admin']),              userController.getUserById);
router.get('/',             authorize(['admin']),               userController.getAllUsers);
router.put('/:userId',      authorize(['admin']),               userController.updateUser);
router.put('/:userId/role', authorize(['admin']),               userController.addRole);
router.delete('/:userId',   authorize(['admin', 'moderator']),  userController.deleteUser);

module.exports = router;


