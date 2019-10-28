import React, { ReactElement, Component } from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ContactUs from '../../components/ContactUs';

jest.mock('react-google-recaptcha', () => {
  class MockRecaptcha extends Component {
    execute = jest.fn();
    render = (): ReactElement => <></>;
  }
  return MockRecaptcha;
});

describe('<ContactUs>', () => {
  describe('for requests', () => {
    const fakeFetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ status: 200 }));
    window.fetch = fakeFetch;

    const name = 'Foo bar';
    const phoneNumber = '123 456 7890';
    const email = 'foo@bar.com';
    const text = 'foobar';

    beforeEach(() => {
      fakeFetch.mockClear();
    });

    describe('not valid', () => {
      it('displays an error if the endpoint fails to send the message', async () => {
        const { getByRole, getByText, getByLabelText } = render(<ContactUs />);

        fakeFetch.mockImplementation(() => Promise.resolve({ status: 400 }));

        fireEvent.change(getByLabelText('Name'), { target: { value: name } });
        fireEvent.change(getByLabelText('Phone Number'), {
          target: { value: phoneNumber },
        });
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(getByLabelText('Message'), {
          target: { value: text },
        });
        fireEvent.click(getByRole('button'));

        await waitForElement(() => getByText(/something went wrong/i));
      });

      it('displays an error if fails to send a request', async () => {
        const { getByRole, getByText, getByLabelText } = render(<ContactUs />);

        fakeFetch.mockImplementation(() => Promise.reject(new Error()));

        fireEvent.change(getByLabelText('Name'), { target: { value: name } });
        fireEvent.change(getByLabelText('Phone Number'), {
          target: { value: phoneNumber },
        });
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(getByLabelText('Message'), {
          target: { value: text },
        });
        fireEvent.click(getByRole('button'));

        await waitForElement(() => getByText(/something went wrong/i));
      });
    });

    it('sends a request to the contact us endpoint', async () => {
      const { getByRole, getByText, getByLabelText } = render(<ContactUs />);

      fakeFetch.mockImplementation(() => Promise.resolve({ status: 200 }));

      const expectedEndpoint = 'http://localhost:3000/message';
      const expectedRequest = {
        method: 'POST',
        body: JSON.stringify({ name, phoneNumber, email, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fireEvent.change(getByLabelText('Name'), { target: { value: name } });
      fireEvent.change(getByLabelText('Phone Number'), {
        target: { value: phoneNumber },
      });
      fireEvent.change(getByLabelText('Email'), { target: { value: email } });
      fireEvent.change(getByLabelText('Message'), {
        target: { value: text },
      });
      fireEvent.click(getByRole('button'));

      await waitForElement(() =>
        getByText(/thank you! we will get back to you/i),
      );

      expect(fakeFetch.mock.calls[0][0]).toBe(expectedEndpoint);
      expect(fakeFetch.mock.calls[0][1]).toEqual(expectedRequest);
    });
  });
});
