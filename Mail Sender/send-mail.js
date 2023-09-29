const nodemailer = require('nodemailer');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.json());

// app.post('/send-mail', (req, res) => {
//     const { from, to, cc, certificateFileUrl, certificateName } = req.body;
//     res.json({
//         status: 'Email sent successfully',
//     });
// })

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 587,
    secure: false,
    auth: {
        user: "certificate-gen@tech2space.in",
        pass: "Hacker@hmm1100",
    },
});


(async () => {
    let info = await transporter.sendMail({
        from: '"Certificate Gen 🤖"<certificate-gen@tech2space.in>',
        // to: "abhayvachhani28@gmail.com",
        // to: "drupani01@gmail.com",
        // to: "draiyani69@gmail.com",
        to: 'belimnisharkhanhasam@gmail.com,mjvala09@gmail.com,kajalbagada12345@gmail.com,desairicha01088@gmail.com,happykansagara1406@gmail.com,kasundrarajani222@gmail.com,dimplemithiya@gmail.com,jimudiyap@gmail.com,abhay@tech2space.in',
        cc: "abhayvachhani28@gmail.com",
        subject: "Test Certificate",
        // text: "",
        html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Download Certificate</title><style>@media (prefers-color-scheme:dark){body{background-color:#fff;color:#000}}body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0}.container{max-width:600px;margin:0 auto;background-color:#fff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1);overflow:hidden}.header{background-image:linear-gradient(to left,#ddd,#d2ffff);text-align:center;padding:40px 0}.logo{width:150px;height:150px}h1{color:#216383;font-size:24px;margin-top:20px}.content{padding:40px 30px}p{font-size:16px;line-height:1.6;margin-bottom:20px}.cta-button{display:inline-block;padding:10px 20px;background-color:#216383;color:#fff;text-decoration:none;border-radius:4px;font-size:18px;transition:background-color .2s}.cta-button:hover{background-color:#024}.footer{background-color:#216383;text-align:center;padding:20px 0}.footer p{font-size:14px;color:#fff;margin:0}</style></head><body><div class="container"><div class="header"><img src="http://certificate-gen.tech2space.in/favicon-small.png" alt="Company Logo" class="logo"><h1>Certificate Gen</h1></div><div class="content"><p>Dear User,</p><p>Your certificate is ready for download. Click the button below to download it:</p><p>Thank you for using Certificate Gen!</p><a href="http://certificate-gen.tech2space.in/logo-small.png" class="cta-button" target="_blank">Download Certificate</a></div><div class="footer"><p>&copy; 2023 Certificate Gen. All rights reserved.</p></div></div></body></html>`,
        attachments: [
            {
                filename: 'certificate.jpg',
                path: 'http://certificate-gen.tech2space.in/logo-small.png'
            }
        ]
    })

    console.log(info.messageId)
    console.log(info)
})()