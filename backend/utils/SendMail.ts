require ("dotenv").config();
import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: {[key: string]: any}
}

const sendEmail = async(options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
            },
        service: process.env.SMTP_SERVICE
        });


    const { email, subject, template, data } = options

    // get the path to the email template with EJS
    const templatePth = path.join(__dirname, "../mail", template);

    // Render the email template EJS 
    const html:string = await ejs.renderFile(templatePth, data);

    // Send the email with Nodemailer
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
        };

        await transporter.sendMail(mailOptions)
       
}

export default sendEmail;
