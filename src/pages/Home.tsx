import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Award } from 'lucide-react';

export default function Home() {
  const featuredDishes = [
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herb butter',
      price: 28.99,
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    },
    {
      id: '2',
      name: 'Truffle Pasta',
      description: 'Handmade pasta with black truffle',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    },
    {
      id: '3',
      name: 'Wagyu Beef',
      description: 'Premium wagyu with seasonal vegetables',
      price: 45.99,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
             RestaurantIn
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up">
            Experience culinary excellence in an atmosphere of refined elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/menu"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View Menu
            </Link>
            <Link
              to="/reservations"
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Make Reservation
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                A Culinary Journey Like No Other
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At  RestaurantIn, we believe dining is an art form. Our award-winning chefs 
                craft each dish with passion and precision, using only the finest locally-sourced 
                ingredients to create unforgettable culinary experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From intimate dinners to special celebrations, our elegant atmosphere and 
                exceptional service ensure every visit is truly memorable.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Award Winning</h3>
                  <p className="text-sm text-gray-600">Michelin recommended</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Expert Chefs</h3>
                  <p className="text-sm text-gray-600">World-class culinary team</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
                alt="Chef preparing food"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">500+ Five-star reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Signature Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most beloved creations, each carefully crafted to deliver 
              an extraordinary dining experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{dish.price}
                    </span>
                    <Link
                      to="/menu"
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-100">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Signature Dishes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-primary-100">Star Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your table today and let us create a memorable dining experience for you
          </p>
          <Link
            to="/reservations"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Clock className="h-5 w-5 mr-2" />
            Reserve Your Table
          </Link>
        </div>
      </section>
    </div>
  );
}