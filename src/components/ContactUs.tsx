import React, { FC, useState, ChangeEvent, FormEvent, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Message } from '../server/message';

const ContactUs: FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [resStatus, setResStatus] = useState(100);

  // use hook
  const recaptchaRef = createRef<ReCAPTCHA>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    recaptchaRef.current && recaptchaRef.current.execute();
    const msg: Message = { name, phoneNumber, email, text };

    try {
      const { status } = await fetch(`http://localhost:3000/message`, {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResStatus(status);
    } catch (e) {
      setResStatus(0);
    }
  };

  return (
    <section>
      <h2>Contact Us</h2>
      <p>
        Got any questions or requests for us? Drop us a line and we will get
        back to you as soon as possible!
      </p>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setName(e.target.value)
            }
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            placeholder="123 456 7890"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              setPhoneNumber(e.target.value);
            }}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="john.doe@gmail.com"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          Message
          <textarea
            value={text}
            placeholder="How can we help?"
            required
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
              setText(e.target.value)
            }
          ></textarea>
        </label>

        <ReCAPTCHA
          badge="inline"
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.RECAPTCHA_API_KEY as string}
        />

        <button type="submit">Send</button>
      </form>
      {(resStatus >= 200 || resStatus === 0) &&
        (resStatus >= 400 || resStatus === 0
          ? 'Something went wrong. Please email us at wishbone.delicatessen@gmail.com instead.'
          : 'Thank you! We will get back to you as soon as we can.')}
      <address>
        <h2>Our Address</h2>
        Wishbone Delicatessen
        <br />
        1407 John Counter Blvd
        <br />
        Kingston, ON Canada K7K 6A9
        <h2>Our Phone Number</h2>
        (613) 544-5446
      </address>
      <h2>Hours</h2>
      <table>
        <tbody>
          <tr>
            <td>Monday - Friday</td>
            <td>7:30 AM - 3:00 PM</td>
          </tr>
          <tr>
            <td>Saturday - Sunday</td>
            <td>CLOSED</td>
          </tr>
        </tbody>
      </table>
      Please note that we are closed on public holidays.
    </section>
  );
};

export { ContactUs as default };
