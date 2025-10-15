/* eslint-disable no-unused-vars */
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    isNumeric?: boolean;
    centerHeader?: boolean;
  }
}
