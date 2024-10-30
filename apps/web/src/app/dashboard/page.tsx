import { getSession } from '@/src/lib/session';
import { Role } from '@/src/lib/type';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const session = await getSession();
  // if (!session || !session.user) redirect('/auth/signin');
  // if (session.user.role !== Role.ADMIN) redirect('/auth/signin');
  console.log({ session });

  return <div>Dashboard</div>;
};

export default Dashboard;
