import {Me} from 'utils/auth/types';

export interface ServerSideProps {
  isProtected?: boolean;
  cookie: string;
  session?: Me | null;
}
