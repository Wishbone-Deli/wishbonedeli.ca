import React, { ReactElement, Component, FC } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { print } from 'graphql/language/printer';
import { Client, defaultExchanges, Provider } from 'urql';
import gql from 'graphql-tag';
import ContactUs from '../../components/ContactUs';

jest.mock('react-google-recaptcha', () => {
  class MockRecaptcha extends Component {
    execute = jest.fn();
    render = (): ReactElement => <></>;
  }
  return MockRecaptcha;
});

describe('<ContactUs>', () => {
  let ContactUsWrapper: FC;

  beforeAll(() => {
    const client = new Client({
      url: 'http://localhost:3000/api',
      exchanges: defaultExchanges,
    });

    // eslint-disable-next-line react/display-name
    ContactUsWrapper = (): ReactElement => (
      <Provider value={client}>
        <ContactUs />
      </Provider>
    );
  });

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
        const { getByRole, findByText, getByLabelText } = render(
          <ContactUsWrapper />,
        );

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
        const { getByRole, findByText, getByLabelText } = render(
          <ContactUsWrapper />,
        );

        fakeFetch.mockImplementation(() => Promise.reject(new Error()));

        fireEvent.change(getByLabelText('Name'), {
          target: { value: name },
        });
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
      let query: string;

      beforeEach(() => {
        fakeFetch.mockImplementation(() =>
          Promise.resolve({
            json: () => ({ data: {} }), // syntax for urql mock response
          }),
        );

        // note: the urql fetchExchange inserts `__typename` as a field into queries
        query = print(gql`
          mutation CreateMessage(
            $name: String
            $phoneNumber: String
            $email: String!
            $text: String!
          ) {
            createMessage(
              name: $name
              phoneNumber: $phoneNumber
              email: $email
              text: $text
            ) {
              name
              phoneNumber
              email
              text
              __typename
            }
          }
        `);
      });

      const expectCorrectRequest = (
        fetchMock: jest.Mock,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expectedRequest: any,
        expectedEndpoint: string,
      ): void => {
        expect(fetchMock.mock.calls[0][0]).toBe(expectedEndpoint);

        const req = fetchMock.mock.calls[0][1];
        expect(req).toHaveProperty('body');
        expect(JSON.parse(req.body)).toMatchObject({ query });
        expect(JSON.parse(req.body)).toMatchObject({
          variables: expectedRequest.variables,
        });

        // expect(JSON.parse(fetchMock.mock.calls[0][1].query)).toEqual(
        //   JSON.parse(expectedRequest.body),
        // );
        // expect(JSON.parse(fetchMock.mock.calls[0][1].variables)).toEqual(
        //   JSON.parse(expectedRequest.variables),
        // );
      };

      it('sends a request to the contact us endpoint', async () => {
        const { getByRole, getByLabelText, getByTestId, findByText } = render(
          <ContactUsWrapper />,
        );

        const expectedEndpoint = 'http://localhost:3000/api';
        const expectedRequest = {
          query,
          variables: {
            name,
            phoneNumber,
            email,
            text,
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
          <ContactUsWrapper />,
        );

        const expectedEndpoint = 'http://localhost:3000/api';
        const expectedRequest = {
          query,
          variables: {
            phoneNumber,
            email,
            text,
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
          <ContactUsWrapper />,
        );

        const expectedEndpoint = 'http://localhost:3000/api';
        const expectedRequest = {
          query,
          variables: {
            name,
            email,
            text,
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
