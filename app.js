const sendGridMail = require('@sendgrid/mail')
const API_KEY = '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'

sendGridMail.setApiKey(API_KEY)

//Notify buyer that the request has been accepted by the Seller 
function successRequest(userEmail){
    const body = 'Test';
    return {
        to : userEmail,
        from: {
            name :'Our company',
            email: 'diyanahj.2020@smu.edu.sg'
        },
        subject: 'Request accepted',
        text: body,
        html: `<strong>${body}</strong>`
    };
}

async function sendEmail(){
    try{
        await sendGridMail.send(successRequest('diyanahjamal@gmail.com')
        ); 
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email');
        console.error(error);
        if (error.response){
            console.error(error.response.body)
        }
    }
}

(async () => {
    console.log('Sending...');
    await sendEmail();
})();