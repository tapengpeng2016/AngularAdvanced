import { Company } from './company.model';

import { Address } from './address.model';

export interface User{
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  company?: Company;
  address?: Address;
}
