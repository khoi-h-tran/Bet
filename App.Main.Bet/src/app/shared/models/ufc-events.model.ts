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
  LightHeavyweight = 'LightHeavyweight',
  Heavyweight = 'Heavyweight',
}

export interface Fighter {
  fighterName: string;
  fighterRecord: string;
  fighterImage: string; // Base64
}

export interface Event {
  eventTime: Date;
  eventCard: UFCCardType;
  eventWeightClass: WeightClass;
  eventFighter1: Fighter;
  eventFighter2: Fighter;
}

export interface Card {
  cardType: UFCCardType;
  cardEvents: Array<Event>;
}

export interface UFCEvents {
  eventName: string;
  eventDate: Date;
  eventVenue: string;
  eventCards: Array<Card>;
}
