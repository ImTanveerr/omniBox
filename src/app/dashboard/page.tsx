'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';
import { User } from '@/types';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Try to get user from localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }

    // Verify token with backend
    const verifyToken = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      } catch (error) {
        console.error('Token verification failed:', error);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-orange-500">🍕 FoodieExpress</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to FoodieExpress!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your account has been successfully created. You&apos;re ready to start ordering delicious food!
          </p>
        </div>

        {/* User Info Card */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Account</h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{user.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-medium">{user.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Member since:</span>
              <span className="ml-2 font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-lg font-bold mb-2">Browse Restaurants</h3>
            <p className="text-gray-600 mb-4">Explore local restaurants and their menus</p>
            <span className="text-sm text-orange-500 font-medium">Coming Soon</span>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-lg font-bold mb-2">Place Orders</h3>
            <p className="text-gray-600 mb-4">Add items to cart and place your orders</p>
            <span className="text-sm text-orange-500 font-medium">Coming Soon</span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center md:col-span-2 lg:col-span-1">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-lg font-bold mb-2">Track Delivery</h3>
            <p className="text-gray-600 mb-4">Real-time tracking of your food delivery</p>
            <span className="text-sm text-orange-500 font-medium">Coming Soon</span>
          </div>
        </div>

        {/* MVP Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2">🚀 MVP Version</h3>
          <p className="text-blue-800 mb-4">
            This is the MVP (Minimum Viable Product) version of FoodieExpress. 
            We&apos;ve successfully implemented user authentication - the foundation of our platform!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-green-600">✅ User Registration</div>
            <div className="text-green-600">✅ User Login</div>
            <div className="text-green-600">✅ Secure Authentication</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 FoodieExpress. This is an MVP demonstration of authentication features.
          </p>
        </div>
      </footer>
    </div>
  );
}