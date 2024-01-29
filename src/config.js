global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';


//conecta ao banco: https://cloud.mongodb.com/
// /https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/

module.exports = {
    connectionString: 'your mongo db connection',
    sendgridKey: 'your sendgrid key',
    containerConnectionString: 'your blob storage account connection'
}
