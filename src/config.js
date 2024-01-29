global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';


//conecta ao banco: https://cloud.mongodb.com/
// /https://www.mongodb.com/docs/drivers/node/current/quick-start/create-a-connection-string/

module.exports = {
    connectionString: 'mongodb+srv://cesarags:LgS7gPJkbbQKrg26@cluster0.v9vrwoc.mongodb.net/demo-api?retryWrites=true&w=majority',
    sendgridKey: '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',
    containerConnectionString: 'DefaultEndpointsProtocol=https;AccountName=nodestoreagsuc;AccountKey=F26YnxF+00reH+Q6FqgzLZguHo6qZQBSX3ZlGFIFEONaxdVqQTDpCF5HdqIB/zQ34SiTSkRz6zF5+AStzy1i3Q==;EndpointSuffix=core.windows.net'
}