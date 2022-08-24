export interface IBetResultModel {
  username: string;
  email: string;
  userID: string;
  accuracy: number;
  countCorrectBets: number;
}

export interface IBetResultsModel {
  betResults: IBetResultModel[];
}
