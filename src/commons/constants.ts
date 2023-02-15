export const roles = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  LECTURER: 'LECTURER',
  LIBRARIAN: 'LIBRARIAN',
};

export enum ErolesEnum {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  LIBRARIAN = 'LIBRARIAN',
}

export const permission = {
  FULL: ['ADMIN', 'STUDENT', 'LECTURER', 'LIBRARIAN'],
  LECTURER: ['ADMIN', 'LECTURER'],
  STUDENT: ['ADMIN', 'LECTURER', 'STUDENT'],
  LIBRARIAN: ['ADMIN', 'LIBRARIAN'],
  ADMIN: ['ADMIN'],
};

export const roleTypeAccessApi = {
  FULL: 'FULL',
  LECTURER: 'LECTURER',
  STUDENT: 'STUDENT',
  LIBRARIAN: 'LIBRARIAN',
  ADMIN: 'ADMIN',
};

export const statusUser = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ENUM: ['ACTIVE', 'INACTIVE'],
};

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
