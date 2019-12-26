import { todayIsBetweenClosedDays } from '../../components/ClosedToast';

const startDate = '2019-05-01';
const endDate = '2019-07-01';

describe('todayIsBetweenClosedDays', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dateNowSpy: jest.SpyInstance;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns true when today falls in between the dates', () => {
    const today = '2019-06-01';

    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(today).valueOf());

    expect(
      todayIsBetweenClosedDays({ type: 'CLOSED', startDate, endDate }),
    ).toBeTruthy();
  });

  it('returns false when today does not fall in between the dates', () => {
    const today = '2019-04-01';

    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(today).valueOf());

    expect(
      todayIsBetweenClosedDays({ type: 'CLOSED', startDate, endDate }),
    ).toBeFalsy();
  });
});

// TODO: test ClosedNotification and ClosedToast
