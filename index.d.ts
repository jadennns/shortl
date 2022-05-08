export interface ShortlUser {
  email: string;
  username: string;
}

export interface ShortlRedirect {
  destination: string;
  email: string;
  name: string;
}

declare module "iron-session" {
  interface IronSessionData {
    user?: ShortlUser;
  }
}
