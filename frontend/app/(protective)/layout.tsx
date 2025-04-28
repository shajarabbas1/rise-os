'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { PAGES_ROUTES } from '@/constants/routes.constants';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(PAGES_ROUTES.login);
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
}
