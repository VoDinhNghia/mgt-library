export enum ErolesUser {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
}

export enum EstatusUser {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const libraryServiceType = {
  BORROW_BOOK: 'BORROW_BOOK',
  BORROW_MAGAZINE: 'BORROW_MAGAZINE',
  BORROW_ROOM: 'BORROW_ROOM',
  RESERVE_SEAT: 'RESERVE_SEAT',
};

export const typePayments = {
  payments: {
    CASH: 'CASH',
    ONLINE: 'ONLINE',
  },
  status: {
    PAID: 'PAID',
    OWED: 'OWED',
  },
};

export const numberIdLibrary = '101';

export const keyAccessBackend = 'libraries-access-key-secrect';
