export enum ErolesUser {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

export enum EstatusUser {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ElibraryServiceType {
  BORROW_BOOK = 'BORROW_BOOK',
  BORROW_MAGAZINE = 'BORROW_MAGAZINE',
  BORROW_ROOM = 'BORROW_ROOM',
  RESERVE_SEAT = 'RESERVE_SEAT',
}

export enum EtypePayments {
  CASH = 'CASH',
  ONLINE = 'ONLINE',
}

export enum EstatusPayments {
  PAID = 'PAID',
  OWED = 'OWED',
}
export const numberIdLibrary = '101';

export const keyAccessBackend = 'libraries-access-key-secrect';

export enum EstatusAppoinment {
  EXPIRED = 'EXPIRED',
  ACCEPTED = 'ACCEPTED',
  CANCEL = 'CANCEL',
}
