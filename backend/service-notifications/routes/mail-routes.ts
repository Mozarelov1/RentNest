import { Router } from 'express';
const emailController = require('../controllers/notifController');
import { authorize } from '../../service-auth/middlewares/rbacRole-middleware'

const router = Router();

router.post('/email/send',      authorize(['admin']), emailController.sendEmail);
router.get('/email/templates',  authorize(['admin']), emailController.getTemplates);
router.post('/email/templates', authorize(['admin']), emailController.createTemplate);

module.exports = router;