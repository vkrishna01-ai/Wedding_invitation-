export type Guest = {
  id: string;
  name: string;
  allowedGuests: number;
  personalizedMessage?: string;
};

export const guests: Record<string, Guest> = {
  'amit': {
    id: 'amit',
    name: 'Amit Sharma',
    allowedGuests: 2,
    personalizedMessage: 'Ravi & Rudrakshi are delighted to invite you.'
  },
  'rahul': {
    id: 'rahul',
    name: 'Rahul',
    allowedGuests: 1,
    personalizedMessage: 'Ravi & Rudrakshi are delighted to invite you.'
  },
  'priya': {
    id: 'priya',
    name: 'Priya',
    allowedGuests: 2,
    personalizedMessage: 'Ravi & Rudrakshi are delighted to invite you.'
  },
  'ananya': {
    id: 'ananya',
    name: 'Ananya',
    allowedGuests: 1,
    personalizedMessage: 'Ravi & Rudrakshi are delighted to invite you.'
  }
}

export const getGuestById = (id: string): Guest | undefined => {
  return guests[id];
}
