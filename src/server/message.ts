import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { config } from 'dotenv';
import {
  Options,
  AuthenticationTypeOAuth2,
} from 'nodemailer/lib/smtp-connection';
import Mail from 'nodemailer/lib/mailer';

export type Message = {
  name?: string;
  phoneNumber?: string;
  email: string;
  text: string;
};

/**
 * Builds the transportation configuration for the mail transporter
 */
export const buildTransportConfig = (): Options & {
  auth: AuthenticationTypeOAuth2;
} => {
  if (process.env.NODE_ENV !== 'production') {
    config();
  }

  const user = process.env.GOOGLE_USER_EMAIL;
  const clientId = process.env.GOOGLE_OAUTH2_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH2_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH2_REFRESH_TOKEN;

  return {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
    },
  };
};

/**
 * Constructs an email to send from the req object
 */
export const buildMessage = (req: Request): Mail.Options => {
  const {
    name = 'Not provided',
    phoneNumber = 'Not provided',
    email,
    text,
  } = req.body as Message;
  const msgSource = 'www.wishbonedeli.ca';
  let formattedText = `Reply to email to respond.


<b>Name:</b>
${name}

<b>Phone number:</b>
${phoneNumber}

<b>Email:</b>
${email}

<b>Message:</b>
${text}`;
  formattedText = formattedText.replace(/\n/g, '<br>');

  const { user } = buildTransportConfig().auth;

  return {
    from: email,
    replyTo: email,
    to: user,
    subject: `New message - email from ${msgSource}`,
    html: formattedText,
  };
};

// TODO: cases for missing email and message
/**
 * Creates a message and sends it
 */
export const createMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  let status;
  const transportConfig = buildTransportConfig();

  const transporter = createTransport(transportConfig);
  try {
    await transporter.verify();

    const mail = buildMessage(req);
    await transporter.sendMail(mail);
    status = 200;
  } catch (e) {
    console.log(e);
    status = 500;
  }
  transporter.close();
  res.sendStatus(status);
};
