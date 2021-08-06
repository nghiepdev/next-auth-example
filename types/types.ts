import {Me} from 'lib/auth/types';

export interface ServerSideProps {
  isProtected?: boolean;
  session?: Me | null;
}
