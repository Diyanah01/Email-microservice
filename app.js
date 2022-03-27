const sendGridMail = require('@sendgrid/mail')
const API_KEY = process.env.SENDGRID_API||``
sendGridMail.setApiKey(API_KEY)

function createEmail(to, subject, text){
    return{
        to,
        from:'esd.team.cs@gmail.com',
        subject,
        text,
        html: `<p>${text}</p>`
    };
}

function sendEmail(to, subject, text){
    sendGridMail
    .send(createEmail(to,subject,text))
    .then((response) => console.log("Email sent..."))
    .catch((error) => console.log(error.message));
}
var amqp = require('amqplib/callback_api');

amqp.connect(process.env.AMQP || "amqp://guest:guest@localhost:5672", function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'emailToSend';

        channel.assertQueue(queue, {
            durable: true
        });
        channel.consume(queue, function(msg) {
            let obj = JSON.parse(msg.content);
            sendEmail(obj.email, "Order number: "+obj.orderId, obj.body);
            console.log(" [x] Received %s", obj.orderId);
        }, 
        {
            noAck: true
        });
  });
});
//sample call that works 
//
