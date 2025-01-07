import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const sendDownloadLinkEmail = async (
  recipientEmail: string,
  downloadLink: string,
  senderEmail: string,
  message: string,
  title: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: recipientEmail,
    subject: `Nouvel upload à télécharger : ${title}`,
    text: `Bonjour, ${senderEmail} vous a envoyé un fichier. Voici le lien pour le télécharger : ${downloadLink}. Message : ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${recipientEmail}`);
  } catch (err) {
    console.error(`Échec de l'envoi de l'email à ${recipientEmail}:`, err);
    throw new Error(`Unable to send email to ${recipientEmail} : ${err}`);
  }
};
