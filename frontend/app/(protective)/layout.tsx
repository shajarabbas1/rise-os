'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('You are not logged in');
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
}
