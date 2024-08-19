'use client';

import * as React from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Calendar() {
  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  return (
    <DateRange
      date={new Date()}
      showDateDisplay={false}
      rangeColors={['#FF5A5F']}
      ranges={state}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(item) => setState([item.selection] as any)}
      minDate={new Date()}
      direction='vertical'
    />
  );
}
