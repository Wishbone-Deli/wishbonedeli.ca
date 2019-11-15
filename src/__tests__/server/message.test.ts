import * as Message from '../../server/message';
import nodemailer, { createTransport } from 'nodemailer';
import { Request, Response } from 'express';
import Mail from 'nodemailer/lib/mailer';
import * as dotenv from 'dotenv';

describe('message', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('credentials', () => {
    it('is verifiable when correct', async () => {
      const transportConfig = Message.buildTransportConfig();
      expect(await createTransport(transportConfig).verify()).toBe(true);
    });

    it('results in verification error when incorrect', async () => {
      const incorrectRefreshToken = 'I am a bad refresh token';
      const transportConfig = Message.buildTransportConfig();
      transportConfig.auth = {
        ...transportConfig.auth,
        refreshToken: incorrectRefreshToken,
      };
      await expect(createTransport(transportConfig).verify()).rejects.toThrow();
    });
  });

  describe('mail building', () => {
    let msgSource: string,
      name: string,
      phoneNumber: string,
      email: string,
      text: string;
    let req: Request;
    let expectedMessageTemplate: Mail.Options;

    beforeEach(() => {
      dotenv.config();

      msgSource = 'www.wishbonedeli.ca';
      name = 'John Doe';
      phoneNumber = '555 555 5555';
      email = 'john.doe@gmail.com';
      text = "This is John Doe's message";
      req = { body: { name, phoneNumber, email, text } } as Request;
      expectedMessageTemplate = {
        from: email,
        replyTo: email,
        to: process.env.GOOGLE_USER_EMAIL,
        subject: `New message - email from ${msgSource}`,
      };
    });

    it('builds a correct message', () => {
      const builtMsg = Message.buildMessage(req);
      let expectedText = `
Reply to email to respond.
<br>
<br>
<br>
<b>Name:</b>
<br>
${name}
<br>
<br>
<b>Phone number:</b>
<br>
${phoneNumber}
<br>
<br>
<b>Email:</b>
<br>
${email}
<br>
<br>
<b>Message:</b>
<br>
${text}
`;
      expectedText = expectedText.replace(/\n/g, '');
      const expectedMsg = { ...expectedMessageTemplate, html: expectedText };

      expect(builtMsg).toEqual(expectedMsg);
    });

    it('builds a correct message without a name', () => {
      delete req.body.name;
      const builtMsg = Message.buildMessage(req);
      let expectedText = `
Reply to email to respond.
<br>
<br>
<br>
<b>Name:</b>
<br>
Not provided
<br>
<br>
<b>Phone number:</b>
<br>
${phoneNumber}
<br>
<br>
<b>Email:</b>
<br>
${email}
<br>
<br>
<b>Message:</b>
<br>
${text}
`;
      expectedText = expectedText.replace(/\n/g, '');
      const expectedMsg = { ...expectedMessageTemplate, html: expectedText };

      expect(builtMsg).toEqual(expectedMsg);
    });

    it('builds a correct message without a phone number', () => {
      delete req.body.phoneNumber;
      const builtMsg = Message.buildMessage(req);
      let expectedText = `
Reply to email to respond.
<br>
<br>
<br>
<b>Name:</b>
<br>
${name}
<br>
<br>
<b>Phone number:</b>
<br>
Not provided
<br>
<br>
<b>Email:</b>
<br>
${email}
<br>
<br>
<b>Message:</b>
<br>
${text}
`;
      expectedText = expectedText.replace(/\n/g, '');
      const expectedMsg = { ...expectedMessageTemplate, html: expectedText };

      expect(builtMsg).toEqual(expectedMsg);
    });
  });

  describe('mailing', () => {
    let name, phoneNumber, email, text;
    let req: Request;
    let res: Response;
    let buildTransportConfigSpy: jest.SpyInstance;
    let buildMessageSpy: jest.SpyInstance;
    let sendMailSpy: jest.SpyInstance;
    let createTransportSpy: jest.SpyInstance;

    beforeEach(() => {
      name = 'John Doe';
      phoneNumber = '555 555 5555';
      email = 'john.doe@gmail.com';
      text = "This is John Doe's message";
      req = { body: { name, phoneNumber, email, text } } as Request;
      res = ({
        sendStatus: jest.fn(),
      } as unknown) as Response;

      buildTransportConfigSpy = jest
        .spyOn(Message, 'buildTransportConfig')
        .mockReturnValue({
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'b27d43731280cb',
            pass: '2115ba060a78cf',
          },
        });
      buildMessageSpy = jest
        .spyOn(Message, 'buildMessage')
        .mockImplementationOnce(() => {
          return {
            ...jest.requireActual('../../server/message').buildMessage(req),
            to: 'foo@bar.com',
          };
        });
      sendMailSpy = jest.spyOn(Mail.prototype, 'sendMail');
      createTransportSpy = jest.spyOn(nodemailer, 'createTransport');
    });

    it('calls appropriate helper functions', async () => {
      await Message.createMessage(req, res);
      expect(buildTransportConfigSpy).toBeCalled();
      expect(createTransportSpy).toBeCalledWith(
        buildTransportConfigSpy.mock.results[0].value,
      );
      expect(buildMessageSpy).toBeCalled();
      expect(sendMailSpy).toBeCalledWith(buildMessageSpy.mock.results[0].value);
      expect(res.sendStatus).toBeCalledWith(200);
    });
  });
});
