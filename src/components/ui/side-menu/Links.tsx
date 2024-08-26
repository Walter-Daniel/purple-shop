import {
    IoLogInOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoTicketOutline 
} from 'react-icons/io5';


export const userLinks = [
    {
        title: 'Profile',
        url: '/profile',
        icon: <IoPersonOutline />
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: <IoTicketOutline />
    }
]

export const adminLinks = [
    {
        title: 'Products',
        url: '/',
        icon: <IoShirtOutline />
    },
    {
        title: 'Orders',
        url: '/admin/orders',
        icon: <IoTicketOutline />
    },
    {
        title: 'Users',
        url: '/admin/users',
        icon: <IoPeopleOutline />
    },
]