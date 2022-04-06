export class User {
  public userName: string = '';
  public email: string = '';
  public userID: string = '';
  public accessToken: string = '';
  public refreshToken: string = '';
  private expirationDate: Date = new Date(2000, 1, 1); // sets old date

  public constructor(
    userName: string,
    email: string,
    userID: string,
    accessToken: string,
    refreshToken: string
  ) {
    this.userName = userName;
    this.email = email;
    this.userID = userID;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public get AccessToken() {
    if (this.accessToken == null || new Date() > this.expirationDate) {
      return null;
    }
    return this.accessToken;
  }

  public set ExpirationDate(expirationDate: string) {
    this.expirationDate = new Date(expirationDate);
  }
}
