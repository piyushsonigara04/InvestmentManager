import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; 
import { FaFire } from "react-icons/fa6";
import logo from './assets/logo.png';
import finnews from './assets/finTrack.png'
import Sentiment from './assets/sentiment.png'
import anotherimage from './assets/stock-market-icon.svg'
import Hero from './assets/bullseye-gradient.svg'

const Home = () => {
  return (
    <div className="bg-[#1D1D41] min-h-screen flex flex-col justify-between text-white">
      <header className="w-full flex justify-between items-center px-6 bg-[#292950]">
        <div className="flex items-center space-x-4">
            <FaFire size={50}></FaFire>
          <h1 className="text-3xl font-bold text-white">Investio</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-lg hover:text-[#6359E9] transition-all duration-300 text-white">Login</Link>
          <Link to="/signup" className="text-lg py-2 px-4 bg-[#6359E9] rounded-md hover:bg-violet-400 transition-all duration-300 text-white">Sign Up</Link>
        </div>
      </header>

      <section className="relative flex items-center justify-center w-full bg-cover bg-center h-[600px]" style={{ backgroundImage: `url(${Hero})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="text-center relative z-10 space-y-4 h-[600px] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-extrabold text-white">Start Investing Like a Pro</h2>
          <p className="text-xl text-white">Track your investments and maximize profits with ease. Invest in stocks and more.</p>
          <Link to="/signup" className="w-1/2 text-white inline-flex items-center justify-center py-2 px-6 text-lg font-semibold bg-[#6359E9] rounded-md hover:bg-violet-400 transition-all duration-300">
            Get Started <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#292950]">
        <h2 className="text-3xl text-center text-white font-bold mb-8">Why Choose Investio?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center text-white">
            <img src={finnews} alt="Feature 1" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Easy Portfolio Management</h3>
            <p className="text-lg">Manage your investments in one place and keep track of your returns.</p>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <img src={Sentiment} alt="Feature 2" className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Real-Time Stock Data</h3>
            <p className="text-lg">Get real-time updates on stock prices and market trends.</p>
          </div>
          <div className="flex flex-col items-center text-center text-white">
            <img src={anotherimage} alt="Feature 3" className="w-20 h-20 mb-4 bg-white" />
            <h3 className="text-2xl font-semibold mb-2">Insights & Analytics</h3>
            <p className="text-lg">Analyze your portfolio performance with advanced tools and metrics.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#6359E9]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-white mb-8">Join Investio today and take control of your financial future.</p>
          <Link to="/signup" className="py-2 px-6 bg-white text-[#6359E9] text-lg font-semibold rounded-md hover:bg-[#6359E9] hover:text-white transition-all duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>

      <footer className="bg-[#292950] py-8 text-white text-center">
        <p>&copy; 2024 Investio. All Rights Reserved.</p>
        <div className="space-x-6 mt-4">
          <Link to="/terms" className="hover:text-[#6359E9]">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-[#6359E9]">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
