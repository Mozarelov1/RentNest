import { NotifDataSource } from '../config/data-source';
import { CreateEmailTemplateDto } from '../dto/CreateEmailTemplateDto';

const emailTemplate = require("../models/template-model")

class TemplateService {
  private notifRepo = NotifDataSource.getRepository<typeof emailTemplate>("EmailTemplate");

  async getTemplates() {
    return this.notifRepo.find();
  }

  async createTemplate(dto: CreateEmailTemplateDto) {
    const tpl = this.notifRepo.create(dto);
    return this.notifRepo.save(tpl);
  }
}

module.exports = new TemplateService();