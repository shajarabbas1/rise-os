import { hashSync } from 'bcryptjs';
import { UserRoleEnum } from '../../../modules/user/entities/user.entity';

const UserSeedData = [
  {
    id: 'c716d3b2-e1e2-400f-9f2b-75c9d6d1e519',
    fullName: 'Faisal Ahmad Khan',
    email: 'faisal.ahmed@piecyfer.com',
    password: hashSync('admin', 10),
    emailVerified: true,
    role: UserRoleEnum.SUPER_ADMIN,
    isRegistrationComplete: true,
  },

  {
    id: 'c726d3b2-e1e2-400f-9f2b-75c9d6d1e519',
    fullName: 'Waqar Hussain',
    email: 'waqar.hussain@piecyfer.com',
    password: hashSync('admin', 10),
    emailVerified: true,
    role: UserRoleEnum.AUDITOR,
    isRegistrationComplete: true,
  },

  {
    id: 'c736d3b2-e1e2-400f-9f2b-75c9d6d1e519',
    fullName: 'Muhammad Umair',
    email: 'muhammad.umair@piecyfer.com',
    password: hashSync('admin', 10),
    emailVerified: true,
    role: UserRoleEnum.USER,
    isRegistrationComplete: true,
  },
];

export default UserSeedData;
