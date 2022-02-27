export enum UFCCardType {
  Main = 'Main Card',
  Preliminary = 'Preliminary Card',
  EarlyPreliminary = 'Early Prelims',
}

export enum WeightClass {
  Strawweight = 'Strawweight',
  Flyweight = 'Flyweight',
  Bantamweight = 'Bantamweight',
  Featherweight = 'Featherweight',
  Lightweight = 'Lightweight',
  Welterweight = 'Welterweight',
  Middleweight = 'Middleweight',
  LightHeavyweight = 'LightHeavyweight',
  Heavyweight = 'Heavyweight',
}

export interface IFighter {
  fighterName: string;
  fighterRecord: string;
  fighterImage: string; // Base64
}

// export interface IEvent {
//   eventTime: Date;
//   eventWeightClass: WeightClass;
//   eventFighter1: IFighter;
//   eventFighter2: IFighter;
// }

// export interface ICard {
//   cardType: UFCCardType;
//   cardEvents: Event[];
// }

export interface IEvent {
  eventWeightClass: string;
  eventFighter1: IFighter;
  eventFighter2: IFighter;
}

export interface ICard {
  eventTime: Date;
  cardType: string;
  cardEvents: IEvent[];
}

export interface IUFCEvents {
  eventName: string;
  eventDate: Date;
  eventVenue: string;
  eventCards: ICard[];
}
