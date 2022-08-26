import { DataSnapshot } from 'firebase/database';
import { ufcTestDataTS } from './UFCEventsTestData';

export const MockDataSnapShot = {
  ref: undefined,
  priority: null,
  key: null,
  size: 0,
  val: function () {
    return MockDataSnapShotVal;
  },
};

export const MockUFCEventsDataSnapShot = {
  ref: undefined,
  priority: null,
  key: null,
  size: 0,
  val: function () {
    return ufcTestDataTS;
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
