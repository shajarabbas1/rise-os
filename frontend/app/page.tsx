'use client';
import RegisterAsProvider from '@/components/layout/feature/career-dashboard/registration-steps/RegisterAsProvider';
import DashboardLayout from './(protective)/compliance/layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PAGES_ROUTES } from '@/constants/routes.constants';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const activeUser = useSelector((state: any) => state.user.user);

  // Redirect safely after render - if the user has not check/validate the email
  useEffect(() => {
    if (!activeUser) {
      router.push(PAGES_ROUTES.login);
    }
  }, [activeUser, router]);

  return (
    <DashboardLayout>
      <RegisterAsProvider />
    </DashboardLayout>
  );
}
