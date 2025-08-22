import React from "react";

function Contact() {
  return (
    <section id="contact" class="py-50 px-20 bg-[#e8f9fd] text-black">
  <div class="container-custom">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      {/* <!-- Contact Details --> */}
      <div>
        <h2 class="text-3xl font-bold mb-6">
          Get In <span class="text-blue-800">Touch</span>
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Have questions or ready to book? Reach out to us anytime.
        </p>
        <div class="space-y-6">
          {/* <!-- Location --> */}
          <div class="flex items-start">
            <svg class="h-6 w-6 text-blue-800 mt-1 mr-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c1.656 0 3-1.343 3-3s-1.344-3-3-3-3 1.343-3 3 1.344 3 3 3zm0 1c-2.667 0-8 1.333-8 4v2h16v-2c0-2.667-5.333-4-8-4z" />
            </svg>
            <div>
              <h3 class="font-bold text-lg mb-1">Location</h3>
              <p class="text-gray-600"> Lucknow, UP, India</p>
            </div>
          </div>

          {/* <!-- Phone --> */}
          <div class="flex items-start">
            <svg class="h-6 w-6 text-blue-800 mt-1 mr-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h1l2 5-2 1a11 11 0 006 6l1-2 5 2v1a2 2 0 01-2 2h-1c-6.627 0-12-5.373-12-12V5z" />
            </svg>
            <div>
              <h3 class="font-bold text-lg mb-1">Phone</h3>
              <p class="text-gray-600">+91 9876543210</p>
            </div>
          </div>

          {/* <!-- Email --> */}
          <div class="flex items-start">
            <svg class="h-6 w-6 text-blue-800 mt-1 mr-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12l-4-4-4 4m8 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m0-4a2 2 0 012-2h8a2 2 0 012 2v4z" />
            </svg>
            <div>
              <h3 class="font-bold text-lg mb-1">Email</h3>
              <p class="text-gray-600">kuldeepprajapati2111@gmail.com</p>
            </div>
          </div>
        </div>
{/* 
        <!-- Social Icons --> */}
        <div class="mt-8 flex space-x-4">
          {/* <!-- Facebook --> */}
          <a href="#" class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label="Facebook">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3h2v3h-1c-1 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z"/>
            </svg>
          </a>
          {/* <!-- Instagram --> */}
          <a href="#" class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label="Instagram">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z"/>
            </svg>
          </a>
          {/* <!-- Twitter --> */}
          <a href="#" class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label="Twitter">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.26 4.26 0 0016.11 4c-2.36 0-4.27 1.91-4.27 4.27 0 .33.04.66.1.97C7.7 8.99 4.07 7.13 1.64 4.16a4.26 4.26 0 00-.58 2.15c0 1.48.75 2.79 1.88 3.55a4.22 4.22 0 01-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.19a4.3 4.3 0 01-1.93.07c.55 1.71 2.13 2.96 4 2.99A8.58 8.58 0 012 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0024 5.5a8.52 8.52 0 01-2.54.7z"/>
            </svg>
          </a>
          {/* <!-- LinkedIn --> */}
          <a href="#" class="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center hover:bg-blue-800 transition-colors" aria-label="LinkedIn">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 112.5 2.5 2.5 2.5 0 01-2.5-2.5zM3 8h4v12H3zm6 0h3.8v1.75h.05a4.15 4.15 0 013.7-2.05c3.95 0 4.7 2.6 4.7 5.95V20h-4v-5.5c0-1.3-.02-3-1.85-3-1.86 0-2.15 1.45-2.15 2.9V20h-4z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* <!-- Contact Form --> */}
      <div class="bg-gray-600 p-8 rounded-xl">
        <h3 class="text-2xl font-bold mb-6">Send Us a Message</h3>
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Your Name</label>
            <input type="text" id="name" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-800" placeholder="Enter your name" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" id="email" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Enter your email" />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Your message here..."></textarea>
          </div>
          <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-lg transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
  );
}

export default Contact;