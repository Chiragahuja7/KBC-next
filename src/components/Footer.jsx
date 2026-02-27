export default function Footer(){
    return(
        <footer className="bg-[#0f5b3f] text-white">
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

    <div>
      <h3 className="text-lg font-semibold mb-4">About Us</h3>
      <p className="text-sm text-gray-200 leading-6 mb-4">
        RefineVeda blends ancient Ayurvedic wisdom with modern science to create
        natural, effective wellness solutions.
      </p>
      <p className="text-sm text-gray-200 leading-6 mb-4">
        Each product is crafted with pure herbs, ethical sourcing, and mindful formulation.
      </p>
      <p className="text-sm text-gray-200 leading-6 mb-4">
        We believe in restoring balance — body, mind, and spirit — the Vedic way.
      </p>
      <p className="text-sm mt-4">+91-9876495313</p>
      <p className="text-sm">info@refineveda.com</p>
      <div className="flex gap-3 mt-5">
        <div className="w-9 h-9 flex items-center justify-center border border-white rounded-full cursor-pointer hover:bg-white hover:text-[#0f5c3f] transition">
          <i className="fab fa-facebook-f text-sm"></i>
        </div>
        <div className="w-9 h-9 flex items-center justify-center border border-white rounded-full cursor-pointer hover:bg-white hover:text-[#0f5c3f] transition">
          <i className="fab fa-instagram text-sm"></i>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">Pages</h3>
      <ul className="space-y-3 text-sm text-gray-200">
        <li><a href="#" className="hover:text-orange-600 hover:underline">Bulk Order Enquiry</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">Contact</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">FAQ</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">Franchise Enquiry</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
      <ul className="space-y-3 text-sm text-gray-200">
        <li><a href="#" className="hover:text-orange-600 hover:underline">Terms and Conditions</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">Shipping Policy</a></li>
        <li><a href="#" className="hover:text-orange-600 hover:underline">Returns, Cancellation and Refund</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Sign Up to Newsletter</h3>

      <p className="text-sm text-gray-200 mb-5 leading-6">
        Sign up for 10% off your first purchase and free shipping. Updates
        information on Sales and Offers.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email..."
          className="w-full px-4 py-3 rounded-full bg-transparent border border-gray-300 placeholder-gray-300 focus:outline-none"
        />

        <button
          className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Sign Up
        </button>
      </div>

      <p className="text-xs text-gray-300 mt-4">
        By entering the e-mail you accept the terms and conditions and the privacy policy
      </p>
    </div>
  </div>

  <div className="border-t border-white/20">
    <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">

      <p className="text-center md:text-left">
        © Refineveda 2026 . Developed with ❤️ by
        <span className="underline cursor-pointer">Chirag Ahuja</span>
      </p>

    </div>
  </div>
</footer>
    )
}