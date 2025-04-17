'use client';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavigation from '@/components/layout/navigation';
import { navigationData } from '@/components/layout/navigation/navigation.data';
import Row from '@/components/shared/row';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Row className="h-full justify-between">
      {/* Sidebar */}
      <Row className="w-[18%] flex-col gap-2 py-2 border-r border-slate-100">
        {navigationData.map((item, index) => (
          <AdminNavigation
            key={index}
            title={item.title}
            isSelected={pathname === item.route}
            onClick={() => router.push(item.route)}
            Icon={item.icon}
          />
        ))}
      </Row>

      {/* Main Content */}
      <Row className="w-[82%] bg-[#f8f0e2] gap-4 flex-col p-4">{children}</Row>
    </Row>
  );
}
