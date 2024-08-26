import { getPaginatedOrders, getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UserTable';


export default async function UsersPage() {

  const { ok, users = [] } =  await getPaginatedUsers();

  if(!ok){
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users}/>
      </div>
    </>
  );
}