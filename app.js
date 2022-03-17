const sgMail = require('@sendgrid/mail')

const API_KEY = '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'


sgMail.setApiKey(API_KEY)

const message = {
    to: 'diyanahjamal@gmail.com',
    from:{
        name:'our company',
        email: 'diyanahj.2020@smu.edu.sg'
    }, 
    subject: 'TEST sendgrid',
    text: 'Hello',
    html: '<h1>Hello</h1>',
};

sgMail
    .send(message)
    .then((response) => console.log("Email sent..."))
    .catch((error) => console.log(error.message)); 