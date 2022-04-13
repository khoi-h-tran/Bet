import { DataSnapshot } from 'firebase/database';

export const MockDataSnapShot = {
  ref: undefined,
  priority: null,
  key: null,
  size: 0,
  child: function (path: string): DataSnapshot {
    throw new Error('Function not implemented.');
  },
  exists: function (): boolean {
    throw new Error('Function not implemented.');
  },
  exportVal: function () {
    throw new Error('Function not implemented.');
  },
  forEach: function (action: (child: DataSnapshot) => boolean | void): boolean {
    throw new Error('Function not implemented.');
  },
  hasChild: function (path: string): boolean {
    throw new Error('Function not implemented.');
  },
  hasChildren: function (): boolean {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object | null {
    throw new Error('Function not implemented.');
  },
  val: function () {
    return MockDataSnapShotVal;
  },
};

export const MockDataSnapShotVal = {
  'UFC 271_Main Card_Heavyweight_Derrick Lewis_vs_Tai Tuivasa': {
    cardType: 'Main Card',
    eventName: 'UFC 271',
    eventWeightClass: 'Heavyweight',
    selectedFighter: 'Derrick Lewis',
  },
  'UFC 271_Main Card_Middleweight_Israel Adesanya_vs_Robert Wittaker': {
    cardType: 'Main Card',
    eventName: 'UFC 271',
    eventWeightClass: 'Middleweight',
    selectedFighter: 'Robert Wittaker',
  },
  'UFC 271_Preliminary Card_Heavyweight_Andrei Arlovski_vs_Jared Vandera': {
    cardType: 'Preliminary Card',
    eventName: 'UFC 271',
    eventWeightClass: 'Heavyweight',
    selectedFighter: 'Jared Vandera',
  },
};
