'use client';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { User } from '@/interfaces';
import { useSearchParams } from 'next/navigation';
import { Modal } from '@/components';
import { UserForm } from './UserForm';
import { HiPencilSquare } from 'react-icons/hi2';
import { useState } from 'react';

interface Props {
    users: User[];
}

export const UsersTable = ({users}:Props) => {
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const [userSelected, setUserSelected] = useState<User|null>(null);

  const handleClick = (user:User) => {
    setUserSelected(user)
  }

  return (
    <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Role
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map( user => (
                <tr key={user.id} 
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id.split('-').at(-1)}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                   {user.name}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                   {user.email}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {user.role}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href="/admin/users?show=true" onClick={() => handleClick(user)}>
                    <HiPencilSquare className='text-2xl' />
                  </Link>
                  {show && userSelected && <UserForm {...userSelected}/>}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
  )
}
