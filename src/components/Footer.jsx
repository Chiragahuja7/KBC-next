import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-200 leading-6 mb-4">
            Kunj Bihari Collection brings you a curated selection of premium products, 
            blending traditional craftsmanship with modern quality standards.
          </p>
          <p className="text-sm text-gray-200 leading-6 mb-4">
            Our mission is to provide our customers with unique and high-quality 
            collections that enhance their lifestyle.
          </p>
          <p className="text-sm text-gray-200 leading-6 mb-4">
            Ethical sourcing and customer satisfaction are at the heart of everything we do.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <p className="text-sm flex items-center gap-2">
              <i className="fa-solid fa-phone"></i> +91-9821005872
            </p>
            <p className="text-sm flex items-center gap-2">
              <i className="fa-solid fa-envelope"></i> info@kunjbiharicollection.in
            </p>
          </div>
          <div className="flex gap-3 mt-5">
            <div className="w-9 h-9 flex items-center justify-center border border-white rounded-full cursor-pointer hover:bg-white hover:text-blue-800 transition">
              <i className="fab fa-facebook-f text-sm"></i>
            </div>
            <div className="w-9 h-9 flex items-center justify-center border border-white rounded-full cursor-pointer hover:bg-white hover:text-pink-600 transition">
              <i className="fab fa-instagram text-sm"></i>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-sm text-gray-200">
            <li><Link href="/terms" className="hover:text-orange-400 hover:underline">Terms and Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-400 hover:underline">Privacy Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-orange-400 hover:underline">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-orange-400 hover:underline">Returns and Refund Policy</Link></li>
            <li><Link href="/contactus" className="hover:text-orange-400 hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-center md:text-left">
            © KunjBihariCollections 2026 . Developed with ❤️ by
            <span className="underline cursor-pointer"> Chirag Ahuja</span>
          </p>
        </div>
      </div>
    </footer>
  );
}