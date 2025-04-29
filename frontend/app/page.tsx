'use client';
import RegisterAsProvider from '@/components/layout/feature/career-dashboard/registration-steps/RegisterAsProvider';
import DashboardLayout from './(protective)/compliance/layout';

export default function Home() {

  return (
    <DashboardLayout>
      <RegisterAsProvider />
    </DashboardLayout>
  );
}
