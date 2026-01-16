/**
 * Navigation Configuration
 * Centralized navigation menu items for navbar and footer
 */

import { ROUTES } from './routes';
import { 
  FiHome, 
  FiGrid, 
  FiUsers, 
  FiInfo, 
  FiMail,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiBuilding,
} from 'react-icons/fi';

/**
 * Public Navigation Menu
 * Main navigation for public pages
 */
export const publicNavigation = [
  {
    id: 'home',
    label: 'nav.home',
    path: ROUTES.HOME,
    icon: FiHome,
  },
  {
    id: 'properties',
    label: 'nav.properties',
    path: ROUTES.PROPERTIES,
    icon: FiGrid,
  },
  {
    id: 'agents',
    label: 'nav.agents',
    path: ROUTES.AGENTS,
    icon: FiUsers,
  },
  {
    id: 'about',
    label: 'nav.about',
    path: ROUTES.ABOUT,
    icon: FiInfo,
  },
  {
    id: 'contact',
    label: 'nav.contact',
    path: ROUTES.CONTACT,
    icon: FiMail,
  },
];

/**
 * Admin Navigation Menu
 * Sidebar navigation for admin panel
 */
export const adminNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.ADMIN_DASHBOARD,
    icon: FiBarChart2,
  },
  {
    id: 'properties',
    label: 'Properties',
    icon: FiGrid,
    children: [
      {
        id: 'properties-list',
        label: 'All Properties',
        path: ROUTES.ADMIN_PROPERTIES,
      },
      {
        id: 'properties-create',
        label: 'Add New',
        path: ROUTES.ADMIN_PROPERTIES_CREATE,
      },
    ],
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: FiUsers,
    children: [
      {
        id: 'agents-list',
        label: 'All Agents',
        path: ROUTES.ADMIN_AGENTS,
      },
      {
        id: 'agents-create',
        label: 'Add New',
        path: ROUTES.ADMIN_AGENTS_CREATE,
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    icon: FiBuilding,
    path: ROUTES.ADMIN_COMPANY_INFO,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: FiSettings,
    children: [
      {
        id: 'profile',
        label: 'Profile',
        path: ROUTES.ADMIN_PROFILE,
      },
      {
        id: 'settings',
        label: 'Settings',
        path: ROUTES.ADMIN_SETTINGS,
      },
    ],
  },
];

/**
 * Footer Navigation
 * Links for footer sections
 */
export const footerNavigation = {
  company: [
    { label: 'nav.about', path: ROUTES.ABOUT },
    { label: 'nav.agents', path: ROUTES.AGENTS },
    { label: 'nav.contact', path: ROUTES.CONTACT },
  ],
  properties: [
    { label: 'Featured Properties', path: ROUTES.PROPERTIES + '?featured=true' },
    { label: 'For Sale', path: ROUTES.PROPERTIES + '?status=sale' },
    { label: 'For Rent', path: ROUTES.PROPERTIES + '?status=rent' },
  ],
  legal: [
    { label: 'Privacy Policy', path: ROUTES.PRIVACY_POLICY },
    { label: 'Terms of Service', path: ROUTES.TERMS_OF_SERVICE },
  ],
};

/**
 * Breadcrumb Configuration
 * Dynamic breadcrumb generation
 */
export const getBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  
  const breadcrumbs = [
    { label: 'nav.home', path: ROUTES.HOME },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Map segments to labels
    const labelMap = {
      properties: 'nav.properties',
      agents: 'nav.agents',
      about: 'nav.about',
      contact: 'nav.contact',
      admin: 'Admin',
      dashboard: 'Dashboard',
    };

    breadcrumbs.push({
      label: labelMap[segment] || segment,
      path: currentPath,
    });
  });

  return breadcrumbs;
};

export default {
  publicNavigation,
  adminNavigation,
  footerNavigation,
  getBreadcrumbs,
};
