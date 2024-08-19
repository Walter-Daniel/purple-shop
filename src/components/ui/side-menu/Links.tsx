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
        url: '/',
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
        url: '/',
        icon: <IoTicketOutline />
    },
    {
        title: 'Users',
        url: '/',
        icon: <IoPeopleOutline />
    },
]