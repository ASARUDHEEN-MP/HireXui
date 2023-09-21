import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { FaEnvelopeOpenText } from 'react-icons/fa';


export const SidebarData = [
  {
    title: 'Home',
    path: '/admin/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/admin/userlist',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Companys', // Add the Logout link
    path: '/admin/Companylist',
    icon: <IoIcons.IoMdBusiness />,
    cName: 'nav-text'
  },
  {
    title: 'Post',
    path: '/admin/postcreation',
    icon: <IoIcons.IoMdPaper />, // Using IoMdPaper as an example
    cName: 'nav-text'
  },
  {
    title: 'Payment',
    path: '/admin/paymenthistory',
    icon: <FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
//   {
//     title: 'Support',
//     path: '/support',
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: 'nav-text'
//   }
];