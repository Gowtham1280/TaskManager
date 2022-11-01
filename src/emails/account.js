const sgMail=require('@sendgrid/mail')

// const sendGridAPIKey=''

// sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'ch.gowtham1280',
        subject:'Thanks for joining!',
        text:`Hi ${name} welcome to the application`
    })
}

const sendCancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'ch.gowtham1280',
        subject:'Thanks for joining!',
        text:`Hi ${name} welcome to the application`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}
