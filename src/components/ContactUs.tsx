import React, { FC, useState, ChangeEvent, FormEvent, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Fadeloader from 'react-spinners/FadeLoader';
import GoogleMapReact, { Coords, Props } from 'google-map-react';
import { Message } from '../server/message';

const ContactUs: FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [resStatus, setResStatus] = useState(100);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = createRef<ReCAPTCHA>();

  /**
   * Get form data and call an endpoint to send the details as an email
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    recaptchaRef.current && recaptchaRef.current.execute();

    // if name and phoneNumber is empty, don't include it in msg
    let msg: Message = { email, text };
    msg = Object.assign(
      msg,
      name !== '' && { name },
      phoneNumber !== '' && { phoneNumber },
    );

    let htmlStatus;
    setLoading(true);
    try {
      const { status } = await fetch(`http://localhost:3000/message`, {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      htmlStatus = status;
    } catch (e) {
      htmlStatus = 0;
    }
    setLoading(false);
    setResStatus(htmlStatus);
  };

  const position: Coords = { lat: 44.260658, lng: -76.518256 };
  const googleMapReactProps: Props = {
    bootstrapURLKeys: {
      key: process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY as string,
    },
    defaultCenter: position,
    zoom: 14,
    yesIWantToUseGoogleMapApiInternals: true,
    onGoogleApiLoaded: ({ map, maps }) => {
      const marker = new maps.Marker({
        position,
        map,
      });
      const infowindow = new maps.InfoWindow({
        content: 'Click to view on Google Maps',
      });
      marker.addListener('click', () => {
        window.open(
          'https://www.google.com/maps/search/?api=1&query=Wishbone%20Delicatessen%2C%20Kingston%20ON&query_place_id=ChIJPY4_SPSr0kwRzD2AKAOZ128',
        );
      });
      marker.addListener('mouseover', () => infowindow.open(map, marker));
      marker.addListener('mouseout', () => infowindow.close());
    },
  };

  return (
    <section>
      <div className="section">
        <div className="container">
          <h2 className="section__title">Contact Us</h2>
          <p className="section__description">
            Got any questions or requests for us? Drop us a line and we will get
            back to you as soon as possible!
          </p>
          <div className="section__divider section__divider--2-columns">
            <div className="section__divider-element">
              <form className="form" onSubmit={onSubmit}>
                <label>
                  <h3 className="form__label">Name</h3>
                  <input
                    className="form__input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      setName(e.target.value)
                    }
                  />
                </label>
                <label>
                  <h3 className="form__label">Phone Number</h3>
                  <input
                    className="form__input"
                    type="tel"
                    placeholder="123 456 7890"
                    value={phoneNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </label>
                <label>
                  <h3 className="form__label">Email</h3>
                  <input
                    className="form__input"
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
                  <h3 className="form__label">Message</h3>
                  <textarea
                    className="form__input"
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

                <button className="btn btn--submit" type="submit">
                  Send
                </button>
                <div data-testid="spinner">
                  {/* todo: make the color configurable through scss */}
                  <Fadeloader
                    data-testid="spinner"
                    color={'#116133'}
                    loading={loading}
                  />
                </div>
              </form>
              {loading === false &&
                (resStatus >= 200 || resStatus === 0) &&
                (resStatus >= 400 || resStatus === 0
                  ? 'Something went wrong. Please email us at wishbone.delicatessen@gmail.com instead.'
                  : 'Thank you! We will get back to you as soon as we can.')}
            </div>
            <address className="section__divider-element">
              <h2 className="section__subtitle">Our Address</h2>
              <div className="section__description">
                Wishbone Delicatessen
                <br />
                1407 John Counter Blvd
                <br />
                Kingston, ON Canada K7K 6A9
              </div>

              <h2 className="section__subtitle">Our Phone Number</h2>
              <div className="section__description">(613) 544-5446</div>

              <h2 className="section__subtitle">Hours</h2>
              <div className="section__description">
                <table className="section__table">
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
              </div>
            </address>
          </div>
        </div>
      </div>
      {/* TODO: need to have test cases */}
      <div className="contact-us__map">
        <GoogleMapReact {...googleMapReactProps} />
      </div>
    </section>
  );
};

export { ContactUs as default };
