import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

// Layouts
import { PublicLayout, AdminLayout, AuthLayout } from '../components/layouts';

// Guards
import PrivateRoute from '../components/guards/PrivateRoute';
import GuestRoute from '../components/guards/GuestRoute';

// Loading Component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner" />
    <p>Loading...</p>
  </div>
);

// ============================================================================
// LAZY LOADED PAGES
// ============================================================================

// Public Pages
const HomePage = lazy(() => import('../pages/public/Home'));
const PropertiesPage = lazy(() => import('../pages/public/Properties'));
const PropertyDetailPage = lazy(() => import('../pages/public/PropertyDetail'));
const AgentsPage = lazy(() => import('../pages/public/Agents'));
const AboutPage = lazy(() => import('../pages/public/About'));
const ContactPage = lazy(() => import('../pages/public/Contact'));

// Admin Auth Pages
const AdminLoginPage = lazy(() => import('../pages/admin/Login'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('../pages/admin/Dashboard'));
const AdminPropertiesPage = lazy(() => import('../pages/admin/Properties'));
const PropertyFormPage = lazy(() => import('../pages/admin/Properties/PropertyForm'));
const AdminAgentsPage = lazy(() => import('../pages/admin/Agents'));
const AgentFormPage = lazy(() => import('../pages/admin/Agents/AgentForm'));
const AdminCompanyInfoPage = lazy(() => import('../pages/admin/CompanyInfo'));
const AdminProfilePage = lazy(() => import('../pages/admin/Profile'));

// Error Pages
const NotFoundPage = lazy(() => import('../pages/errors/NotFound404'));

/**
 * AppRouter Component
 * Main routing configuration with nested routes and guards
 * 
 * Route Structure:
 * - Public Routes (with PublicLayout)
 * - Admin Auth Routes (with AuthLayout + GuestRoute)
 * - Admin Protected Routes (with AdminLayout + PrivateRoute)
 * - Error Routes (404)
 * 
 * @component
 */
const AppRouter = () => {
  // Get current user for admin layout
  const getCurrentUser = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  const currentUser = getCurrentUser();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* ================================================================
            PUBLIC ROUTES (with PublicLayout)
        ================================================================ */}
        <Route element={<PublicLayout />}>
          {/* Home */}
          <Route index element={<HomePage />} />
          
          {/* Properties */}
          <Route path={ROUTES.PROPERTIES} element={<PropertiesPage />} />
          <Route path={ROUTES.PROPERTY_DETAIL} element={<PropertyDetailPage />} />
          
          {/* Contact */}
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          
          {/* Agents */}
          <Route path={ROUTES.AGENTS} element={<AgentsPage />} />
          
          {/* About */}
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        </Route>

        {/* ================================================================
            ADMIN AUTH ROUTES (with AuthLayout + GuestRoute)
        ================================================================ */}
        <Route
          path={ROUTES.ADMIN_LOGIN}
          element={
            <GuestRoute>
              <AuthLayout showBackToHome>
                <AdminLoginPage />
              </AuthLayout>
            </GuestRoute>
          }
        />
        
        <Route
          path={ROUTES.ADMIN_FORGOT_PASSWORD}
          element={
            <GuestRoute>
              <AuthLayout showBackToHome>
                <div className="auth-form">
                  <h2 className="auth-form__title">Forgot Password</h2>
                  <p className="auth-form__subtitle">Coming Soon</p>
                </div>
              </AuthLayout>
            </GuestRoute>
          }
        />

        {/* ================================================================
            ADMIN PROTECTED ROUTES (with AdminLayout + PrivateRoute)
        ================================================================ */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout user={currentUser} />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route path="dashboard" element={<AdminDashboardPage />} />
          
          {/* Properties Management */}
          <Route path="properties" element={<AdminPropertiesPage />} />
          <Route path="properties/create" element={<PropertyFormPage />} />
          <Route path="properties/edit/:id" element={<PropertyFormPage />} />
          
          {/* Agents Management */}
          <Route path="agents" element={<AdminAgentsPage />} />
          <Route path="agents/create" element={<AgentFormPage />} />
          <Route path="agents/edit/:id" element={<AgentFormPage />} />
          
          {/* Company Info */}
          <Route path="company-info" element={<AdminCompanyInfoPage />} />
          
          {/* Profile & Settings */}
          <Route path="profile" element={<AdminProfilePage />} />
          
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        </Route>

        {/* ================================================================
            ERROR ROUTES
        ================================================================ */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
