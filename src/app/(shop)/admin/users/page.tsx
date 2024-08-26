import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UserTable';
import { Modal } from '@/components/ui/modal/Modal';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};




export default async function UsersPage({ searchParams }: SearchParamProps) {
  const { ok, users = [] } =  await getPaginatedUsers();

  if(!ok){
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users}/>
        {/* <Modal /> */}
      </div>
    </>
  );
}