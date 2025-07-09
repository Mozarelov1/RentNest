import nodemailer, { Transporter } from 'nodemailer';


export interface RentReceiptData {
  tenantName: string;
  propertyTitle: string;
  propertyAddress: string;
  rentPeriodStart: string;
  rentPeriodEnd: string;
  totalAmount: string;
  receiptNumber: string;
  paymentDate: string;
  supportEmail: string;
  logoUrl: string;
}

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.SMTP_HOST,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }


   async sendRentReceiptMail(to: string, receiptData: RentReceiptData): Promise<void> {
    const {
      tenantName,
      propertyTitle,
      propertyAddress,
      rentPeriodStart,
      rentPeriodEnd,
      totalAmount,
      receiptNumber,
      paymentDate,
      supportEmail,
      logoUrl,
    } = receiptData;

    const subject = `RentNest Rental Receipt #${receiptNumber}`;
    const text = `Hello, ${tenantName}!\n` +
      `Your rental payment receipt #${receiptNumber} for \"${propertyTitle}\" has been generated.\n` +
      `Rental period: ${rentPeriodStart} — ${rentPeriodEnd}.\n` +
      `Total amount: ${totalAmount}.\n` +
      `Payment date: ${paymentDate}.\n` +
      `If you have any questions, please contact us at ${supportEmail}.`;

    const html = `
      <div style=\"font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;\">
        <div style=\"text-align:center;margin-bottom:30px;\">
          <img src=\"${logoUrl}\" alt=\"RentNest\" style=\"max-height:60px;\">
        </div>
        <h2 style=\"color:#444;\">Rental Receipt #${receiptNumber}</h2>
        <p>Hello, <strong>${tenantName}</strong>!</p>
        <table style=\"width:100%;border-collapse:collapse;margin:20px 0;\">
          <tr>
            <td style=\"padding:8px;border:1px solid #ddd;\"><strong>Property:</strong></td>
            <td style=\"padding:8px;border:1px solid #ddd;\">${propertyTitle}</td>
          </tr>
          <tr>
            <td style=\"padding:8px;border:1px solid #ddd;\"><strong>Address:</strong></td>
            <td style=\"padding:8px;border:1px solid #ddd;\">${propertyAddress}</td>
          </tr>
          <tr>
            <td style=\"padding:8px;border:1px solid #ddd;\"><strong>Rental Period:</strong></td>
            <td style=\"padding:8px;border:1px solid #ddd;\">${rentPeriodStart} — ${rentPeriodEnd}</td>
          </tr>
          <tr>
            <td style=\"padding:8px;border:1px solid #ddd;\"><strong>Total Amount:</strong></td>
            <td style=\"padding:8px;border:1px solid #ddd;\">${totalAmount}</td>
          </tr>
          <tr>
            <td style=\"padding:8px;border:1px solid #ddd;\"><strong>Payment Date:</strong></td>
            <td style=\"padding:8px;border:1px solid #ddd;\">${paymentDate}</td>
          </tr>
        </table>
        <p style=\"margin:20px 0;\">
          Thank you for choosing <strong>RentNest</strong>!<br>
          If you have any questions, please reach out to our support team at 
          <a href=\"mailto:${supportEmail}\" style=\"color:#1a73e8;\">${supportEmail}</a>
        </p>
        <hr style=\"border:none;border-top:1px solid #eee;margin:30px 0;\">
        <p style=\"font-size:12px;color:#777;text-align:center;\">
          © ${new Date().getFullYear()} RentNest. All rights reserved.
        </p>
      </div>
    `;

    await this.transporter.sendMail({ from: process.env.SMTP_HOST as string, to, subject, text, html });
  };

}

export default new MailService();
