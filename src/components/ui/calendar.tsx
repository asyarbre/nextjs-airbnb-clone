'use client';

import { eachDayOfInterval } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  startDate: Date;
  endDate: Date;
}

export default function Calendar({
  reservation,
}: {
  reservation: CalendarProps[] | undefined;
}) {
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  let disabledDates: Date[] = [];

  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  return (
    <>
      <input
        type='hidden'
        name='startDate'
        value={state[0].startDate.toISOString()}
      />
      <input
        type='hidden'
        name='endDate'
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={['#FF5A5F']}
        ranges={state}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction='vertical'
        disabledDates={disabledDates}
      />
    </>
  );
}
