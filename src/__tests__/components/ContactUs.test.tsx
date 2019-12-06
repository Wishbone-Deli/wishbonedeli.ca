import React, { ReactElement, Component } from 'react';
import { render, fireEvent } from '@testing-library/react';
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
        const { getByRole, findByText, getByLabelText } = render(<ContactUs />);

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

        await findByText(/something went wrong/i);
      });

      it('displays an error if fails to send a request', async () => {
        const { getByRole, findByText, getByLabelText } = render(<ContactUs />);

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

        await findByText(/something went wrong/i);
      });
    });

    describe('with valid inputs', () => {
      beforeEach(() => {
        fakeFetch.mockImplementation(() => Promise.resolve({ status: 200 }));
      });

      const expectCorrectRequest = (
        fetchMock: jest.Mock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expectedRequest: any,
        expectedEndpoint: string,
      ): void => {
        expect(fetchMock.mock.calls[0][0]).toBe(expectedEndpoint);
        (Object.keys(expectedRequest) as Array<
          keyof typeof expectedRequest
        >).forEach(key => {
          if (key !== 'body') {
            expect(fetchMock.mock.calls[0][1][key]).toEqual(
              expectedRequest[key],
            );
          }
        });
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(
          JSON.parse(expectedRequest.body),
        );
      };

      it('sends a request to the contact us endpoint', async () => {
        const { getByRole, getByLabelText, getByTestId, findByText } = render(
          <ContactUs />,
        );

        const expectedEndpoint = 'http://localhost:3000/message';
        const expectedRequest = {
          method: 'POST',
          body: JSON.stringify({ name, phoneNumber, email, text }),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const spinner = getByTestId('spinner');
        expect(spinner).toBeEmpty();

        fireEvent.change(getByLabelText('Name'), { target: { value: name } });
        fireEvent.change(getByLabelText('Phone Number'), {
          target: { value: phoneNumber },
        });
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(getByLabelText('Message'), {
          target: { value: text },
        });
        fireEvent.click(getByRole('button'));

        expect(spinner).not.toBeEmpty();

        await findByText(/thank you! we will get back to you/i);
        expect(spinner).toBeEmpty();

        expectCorrectRequest(fakeFetch, expectedRequest, expectedEndpoint);
      });

      it('sends a request to the contact us endpoint without name', async () => {
        const { getByRole, findByText, getByLabelText, getByTestId } = render(
          <ContactUs />,
        );

        const expectedEndpoint = 'http://localhost:3000/message';
        const expectedRequest = {
          method: 'POST',
          body: JSON.stringify({ phoneNumber, email, text }),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const spinner = getByTestId('spinner');
        expect(spinner).toBeEmpty();

        fireEvent.change(getByLabelText('Phone Number'), {
          target: { value: phoneNumber },
        });
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(getByLabelText('Message'), {
          target: { value: text },
        });
        fireEvent.click(getByRole('button'));

        expect(spinner).not.toBeEmpty();

        await findByText(/thank you! we will get back to you/i);
        expect(spinner).toBeEmpty();

        expectCorrectRequest(fakeFetch, expectedRequest, expectedEndpoint);
      });

      it('sends a request to the contact us endpoint without phone number', async () => {
        const { getByRole, findByText, getByLabelText, getByTestId } = render(
          <ContactUs />,
        );

        const expectedEndpoint = 'http://localhost:3000/message';
        const expectedRequest = {
          method: 'POST',
          body: JSON.stringify({ name, email, text }),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const spinner = getByTestId('spinner');
        expect(spinner).toBeEmpty();

        fireEvent.change(getByLabelText('Name'), { target: { value: name } });
        fireEvent.change(getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(getByLabelText('Message'), {
          target: { value: text },
        });
        fireEvent.click(getByRole('button'));

        expect(spinner).not.toBeEmpty();

        await findByText(/thank you! we will get back to you/i);
        expect(spinner).toBeEmpty();

        expectCorrectRequest(fakeFetch, expectedRequest, expectedEndpoint);
      });
    });
  });
});
