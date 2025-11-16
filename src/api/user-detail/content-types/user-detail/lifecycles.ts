// src/api/user-details/content-types/user-details/lifecycles.ts
export default ({ strapi }) => ({
  async afterCreate(event: any) {
    const { result } = event;
    const { name, email, subject, message } = result;

    // 1) Email TO YOU (notification)
    try {
      await strapi.email.send({
        to: process.env.DEFAULT_FROM_EMAIL,
        from: process.env.DEFAULT_FROM_EMAIL,
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    } catch (err) {
      strapi.log.error("Failed to send admin notification email", err);
    }

    // 2) Confirmation Email to USER (auto-reply)
    try {
      await strapi.email.send({
        to: email, // <-- THE USER's EMAIL
        from: process.env.DEFAULT_FROM_EMAIL,
        subject: "Thank you for contacting me ✔",
        html: `
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out. I've received your message and I will get back to you shortly.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
          <br/>
          <p>Best regards,<br/>Yogesh Mishra</p>
        `,
      });
    } catch (err) {
      strapi.log.error("Failed to send confirmation email to user", err);
    }
  },
});
