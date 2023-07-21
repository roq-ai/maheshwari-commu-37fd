import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface IdentityCardInterface {
  id?: string;
  user_id?: string;
  verified?: boolean;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface IdentityCardGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
