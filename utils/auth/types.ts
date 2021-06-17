export interface Me {
  email: string;
}

export type AuthProviderProps = React.PropsWithChildren<{
  isProtected: boolean;
  session?: Me;
}>;
