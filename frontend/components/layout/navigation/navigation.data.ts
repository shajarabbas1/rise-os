import { PAGES_ROUTES } from '@/constants/routes.constants';
import { VscPreview } from 'react-icons/vsc';

export const navigationData = [
  {
    title: 'Career Dashboard',
    icon: VscPreview,
    route: PAGES_ROUTES.careerDashboard,
  },
  {
    title: 'Participant',
    icon: VscPreview,
    route: PAGES_ROUTES.participant,
  },
  {
    title: 'Compliance',
    icon: VscPreview,
    route: PAGES_ROUTES.compliance,
  },
  { title: 'Policies', icon: VscPreview, route: PAGES_ROUTES.policies },
  {
    title: 'Pulse Chat',
    icon: VscPreview,
    route: PAGES_ROUTES.pulseChat,
  },
  { title: 'Calendar', icon: VscPreview, route: PAGES_ROUTES.calendar },
  {
    title: 'Policy Management',
    icon: VscPreview,
    route: PAGES_ROUTES.policyManagement,
  },
];
