import express from "express";
import { adminOnly } from "../middlewares/admin-middleware"
const router = express.Router();

const adminController = require('../controllers/adminController')

router.get('/',             adminController.getAllUsers);
router.get('/:userId',      adminController.getUserById);
router.put('/:userId',      adminController.updateUser);
router.put('/:userId/role', adminOnly ,adminController.addRole);
router.delete('/:userId',   adminController.deleteUser);


module.exports = router;


