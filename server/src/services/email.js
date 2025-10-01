const nodemailer = require('nodemailer');
let transporterPromise = null;
async function getTransporter() {
    if (transporterPromise) return transporterPromise;
    if (!process.env.SMTP_HOST) {
        // Use Ethereal for development
        transporterPromise = nodemailer.createTestAccount().then(testAccount => {
            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: { user: testAccount.user, pass: testAccount.pass }
            });
        });
    } else {
        transporterPromise = Promise.resolve(nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        }));
    }
    return transporterPromise;
}
exports.sendOrderConfirmation = async (to, order) => {
    console.log("Sending order confirmation to:", to, "for order:", order);
    
    const transporter = await getTransporter();
    const html = `<h1>Thanks for your order</h1><p>Order #${order._id}</
 p><p>Total: ${order.total}</p>`;
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL ||
            'orders@brand.test', to, subject: `Order confirmation #${order._id}`, html
    });
    if (nodemailer.getTestMessageUrl(info)) {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    return info;
};