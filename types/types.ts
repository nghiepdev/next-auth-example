import {Me} from 'utils/auth/types';

export interface ServerSideProps {
  isProtected?: boolean;
  session?: Me | null;
}
