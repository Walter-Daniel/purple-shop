import {
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoTicketOutline 
} from 'react-icons/io5';


export const userLinks = [
    {
        title: 'Profile',
        url: '/',
        icon: <IoPersonOutline />
    },
    {
        title: 'Orders',
        url: '/',
        icon: <IoTicketOutline />
    },
    {
        title: 'Sign in',
        url: '/',
        icon: <IoLogInOutline />
    },
    {
        title: 'Logout',
        url: '/',
        icon: <IoLogOutOutline />
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
        url: '/',
        icon: <IoTicketOutline />
    },
    {
        title: 'Users',
        url: '/',
        icon: <IoPeopleOutline />
    },
]