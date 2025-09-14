import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-orange-500">🍕 FoodieExpress</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Delicious Food
            <span className="text-orange-500"> Delivered Fast</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get your favorite meals delivered to your doorstep in minutes. Fresh ingredients, 
            amazing taste, and lightning-fast delivery - that&apos;s our promise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Order Now
            </Link>
            <Link 
              href="/auth/login" 
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Lightning Fast</h3>
            <p className="text-gray-600">Get your food delivered in 30 minutes or less with our express delivery network.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">🥘</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Fresh & Tasty</h3>
            <p className="text-gray-600">We partner with the best local restaurants to bring you fresh, delicious meals.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Ordering</h3>
            <p className="text-gray-600">Simple, intuitive interface that makes ordering your favorite food a breeze.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-orange-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to start ordering?</h2>
          <p className="text-xl mb-6 opacity-90">Join thousands of satisfied customers who trust FoodieExpress for their meals.</p>
          <Link 
            href="/auth/register" 
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">🍕 FoodieExpress</h3>
          <p className="text-gray-400 mb-4">Bringing delicious food to your doorstep since 2024.</p>
          <p className="text-sm text-gray-500">
            © 2024 FoodieExpress. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
