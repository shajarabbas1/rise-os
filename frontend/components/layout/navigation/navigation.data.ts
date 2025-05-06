import { PAGES_ROUTES } from '@/constants/routes.constants';
import { MdOutlineChat } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { LuBookOpenCheck, LuChartBarBig } from 'react-icons/lu';
import { GiNotebook, GiAerialSignal } from 'react-icons/gi';
import { TbSettingsCog } from 'react-icons/tb';

export const navigationData = [
  {
    title: 'Career Dashboard',
    icon: GiAerialSignal,
    route: PAGES_ROUTES.careerDashboard,
  },
  {
    title: 'Participant',
    icon: LuChartBarBig,
    route: PAGES_ROUTES.participant,
  },
  {
    title: 'Compliance',
    icon: GiNotebook,
    route: PAGES_ROUTES.compliance,
  },
  { title: 'Policies', icon: LuBookOpenCheck, route: PAGES_ROUTES.policies },
  {
    title: 'Pulse Chat',
    icon: MdOutlineChat,
    route: PAGES_ROUTES.pulseChat,
  },
  { title: 'Calendar', icon: CiCalendarDate, route: PAGES_ROUTES.calendar },
  {
    title: 'Policy Management',
    icon: TbSettingsCog,
    route: PAGES_ROUTES.policyManagement,
  },
];
