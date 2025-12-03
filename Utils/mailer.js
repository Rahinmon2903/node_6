import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//transporter says which service we need and a gmail we are going using to send it
const transport =nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.PASS_MAIL,
        pass:process.env.PASS_KEY
    }
})

//it show the structure of the email
const sendEmail =async(to,subject,text)=>{
    const mailOptions={
        from:process.env.PASS_MAIL,
        to,
        subject,
        text
    }
    return transport.sendMail(mailOptions)
}
export default sendEmail;