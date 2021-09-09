interface Me {
  email: string;
}

export interface SessionState {
  me: Me;
  access_token: string;
}
