import { Router } from 'express';
const emailController = require('../controllers/notifController');

const router = Router();
router.post('/email/send', emailController.sendEmail);
router.get('/email/templates', emailController.getTemplates);
router.post('/email/templates', emailController.createTemplate);

module.exports = router;