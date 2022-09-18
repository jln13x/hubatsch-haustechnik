import type { VercelApiHandler } from "@vercel/node";
import { z } from "zod";
import mailjet, { SendEmailV3_1 } from "node-mailjet";
import dompurify from "isomorphic-dompurify";

const handler: VercelApiHandler = async (req, res) => {
  if (req.method != "POST") {
    res.status(405).send({ message: "Method not allowed" });
    return;
  }

  const schemaResult = schema.safeParse(req.body);

  if (!schemaResult.success) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }

  const { name, email, phone, message } = schemaResult.data;

  const sanitizedMessage = dompurify.sanitize(message);
  const sanitizedPhone = phone ? dompurify.sanitize(phone) : undefined;
  const sanitizedName = dompurify.sanitize(name);
  const sanitizedEmail = dompurify.sanitize(email);

  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_API_SECRET;
  const fromEmail = process.env.MAILJET_FROM_EMAIL;
  const toEmail = process.env.MAILJET_TO_EMAIL;
  const templateId = process.env.MAILJET_TEMPLATE_ID;

  if (!apiKey || !apiSecret || !fromEmail || !toEmail || !templateId) {
    console.log("Missing enviroment variables");
    res.status(500).send({
      message: "Internal Server Error",
    });
    return;
  }

  const mailClient = mailjet.apiConnect(apiKey, apiSecret);

  const data: SendEmailV3_1.IBody = {
    Messages: [
      {
        From: {
          Email: fromEmail,
        },
        To: [
          {
            Email: toEmail,
          },
        ],
        TemplateID: +templateId,
        TemplateLanguage: true,
        Variables: {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone || "Es wurde keine Telefonnummer angegeben",
          message: sanitizedMessage,
        },
      },
    ],
  };

  try {
    await mailClient
      .post("send", { version: "v3.1" })
      // @ts-ignore
      .request(data);
    return res.status(200).send({ message: "Success" });
  } catch (e) {
    console.log(e);

    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  privacy: z.literal("on"),
});

export default handler;
