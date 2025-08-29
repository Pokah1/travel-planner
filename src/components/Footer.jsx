import { Plane, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#03547c] text-white dark:bg-gray-900 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Plane className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold tracking-wide">Trivana</h2>
          </div>
          <p className="text-sm text-gray-200 dark:text-gray-400 leading-relaxed">
            Your ultimate travel planner — discover destinations, find hotels,
            book flights, and explore the world with ease.
          </p>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Destinations</h3>
          <ul className="space-y-2 text-sm text-gray-200 dark:text-gray-400">
            <li>Bali</li>
            <li>Dubai</li>
            <li>Maldives</li>
            <li>Qatar</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-200 dark:text-gray-400">
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Travel Blog</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
          <div className="grid grid-cols-3 gap-4 text-gray-200 dark:text-gray-400 max-w-[150px]">
            <a
              href="https://github.com/pokah1"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto"
            >
              <Github className="h-5 w-5 cursor-pointer hover:text-blue-300 transition-transform transform hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/odokwo-dev01/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto"
            >
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-pink-300 transition-transform transform hover:scale-110" />
            </a>
            <a
              href="https://twitter.com/sirpokah"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto"
            >
              <Twitter className="h-5 w-5 cursor-pointer hover:text-sky-300 transition-transform transform hover:scale-110" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 py-4 text-center text-sm text-gray-300 dark:text-gray-500">
        © {new Date().getFullYear()} Trivana. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
