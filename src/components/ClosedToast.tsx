import React, { useEffect, FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

export type ClosedDays = {
  type: 'CLOSED' | string;
  message?: string;
  startDate: string;
  endDate: string;
};

// TODO: should be gotten from an API endpoint
export const closedDaysList: ClosedDays[] = [
  {
    type: 'CLOSED',
    message: 'Happy Holidays!',
    startDate: '2019-12-20',
    endDate: '2020-01-03',
  },
  // TODO: extensive testing for multiple overlapping holidays
];

export const ClosedNotification: FC<ClosedDays> = ({
  message,
  startDate,
  endDate,
}: ClosedDays) => {
  return (
    <div className="notification__body">
      We are <strong>CLOSED</strong> from{' '}
      <strong>{moment(startDate).format('MMMM Do YYYY')}</strong> to{' '}
      <strong>{moment(endDate).format('MMMM Do YYYY')}</strong>.
      {message ? ' ' + message : ''}
    </div>
  );
};

export const todayIsBetweenClosedDays = ({
  type,
  startDate,
  endDate,
}: ClosedDays): boolean =>
  type === 'CLOSED' && moment().isBetween(startDate, endDate, undefined, '[]');

const ClosedToast: FC = () => {
  const ackKey = 'ack';

  const renderToastForClosedDays = (closedDaysList: ClosedDays[]): void => {
    closedDaysList.forEach((closedDays: ClosedDays) => {
      if (todayIsBetweenClosedDays(closedDays)) {
        toast(<ClosedNotification {...closedDays} />, {
          position: toast.POSITION.BOTTOM_CENTER,
          // when the toast is unmounted, the app will assume that the notification has been acknowledged and won't show again for the remainder of the session
          className: 'notification',
          onClose: () => {
            sessionStorage.setItem(ackKey, JSON.stringify(true));
          },
        });
      }
    });
  };

  // load when first rendered
  // note that no SSR is done here
  useEffect(() => {
    // TODO: API call here

    const notificationAcked = JSON.parse(
      sessionStorage.getItem(ackKey) || 'false',
    );

    // bring up notification if it has not been acknowledged before
    if (!notificationAcked) {
      renderToastForClosedDays(closedDaysList);
    }
  }, []);

  return <ToastContainer autoClose={false} />;
};

export { ClosedToast as default };
