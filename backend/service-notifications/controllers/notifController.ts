import { Request, Response, NextFunction } from 'express';

const emailService = require('../services/email-service')
const templateService = require('../services/template-service');

class EmailController {
  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, subject, text, html, templateId, variables } = req.body;
      let finalSubject = subject;
      let finalHtml = html;

      if (templateId) {
        const tpl = await templateService.getTemplates()
          .then((list: any[]) => list.find((t: { id: any; }) => t.id === templateId));
        if (!tpl) return res.status(404).json({ message: 'Template not found' });
        finalSubject = tpl.subject;
        finalHtml = tpl.body.replace(/\{\{(\w+)\}\}/g, (_: any, key: string) => variables?.[key] || '');
      }

      await emailService.sendMail({ to, subject: finalSubject, text, html: finalHtml });
      res.status(200).json({ message: 'Email sent' });
    } catch (e) {
      next(e);
    }
  }

  async getTemplates(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await templateService.getTemplates();
      res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async createTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, subject, body } = req.body;
      if (!name || !subject || !body) {
        return res.status(400).json({ message: 'name, subject and body are required' });
      }
      const tpl = await templateService.createTemplate({ name, subject, body });
      res.status(201).json(tpl);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EmailController();