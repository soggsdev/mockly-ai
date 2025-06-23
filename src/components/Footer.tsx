import React, { useEffect, useState } from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const gradientText =
    "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer
      className={`bg-gray-950 text-gray-300 py-20 transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div
          className={`transform transition-all duration-700 ease-out delay-100 mr-20 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <img
            src="/public/mockly-logomark-footer.png"
            width="180px"
          ></img>
          <p className="text-gray-400 text-xs leading-relaxed">
            AI-powered interview preparation platform helping you master your
            next big opportunity.
          </p>
        </div>

        {/* Resources */}
        <div
          className={`transform transition-all duration-700 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className={`text-lg font-semibold mb-4 ${gradientText}`}>
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            {["How It Works", "FAQ", "Support", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white transition duration-300
             hover:text-transparent hover:bg-clip-text 
             hover:bg-gradient-to-r hover:from-white hover:via-purple-500 hover:to-indigo-400 
             hover:bg-[length:200%_200%] hover:animate-gradient-x"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div
          className={`transform transition-all duration-700 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className={`text-lg font-semibold mb-4 ${gradientText}`}>
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            {["Home"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white transition duration-300
             hover:text-transparent hover:bg-clip-text 
             hover:bg-gradient-to-r hover:from-white hover:via-purple-500 hover:to-indigo-400 
             hover:bg-[length:200%_200%] hover:animate-gradient-x"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div
          className={`transform transition-all duration-700 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className={`text-lg font-semibold mb-4 ${gradientText}`}>
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Blog", "Terms"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white transition duration-300
             hover:text-transparent hover:bg-clip-text 
             hover:bg-gradient-to-r hover:from-white hover:via-purple-500 hover:to-indigo-400 
             hover:bg-[length:200%_200%] hover:animate-gradient-x"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social
        <div
          className={`transform transition-all duration-700 ease-out delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className={`text-lg font-semibold mb-4 ${gradientText}`}>
            Follow Us
          </h4>
          <div className="flex space-x-6">
            {[
              {
                href: "https://github.com/soguuh",
                label: "GitHub",
                icon: <Github className="w-6 h-6 text-gray-400" />,
              },
              {
                href: "https://twitter.com/soggymousepad",
                label: "Twitter",
                icon: <Twitter className="w-6 h-6 text-gray-400" />,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-transform duration-300 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div> */}

      </div>

      {/* Copyright */}
        <div
          className={`flex items-end justify-center md:justify-end text-gray-500 text-sm transform transition-all duration-700 ease-out delay-400 mr-10 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} Mockly. All rights reserved.</p>
        </div>

        {/* Credits */}
        <div
          className={`flex items-end justify-center md:justify-end text-gray-500 text-sm transform transition-all duration-700 ease-out delay-400 mr-10 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p>Made with ❤️ by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400 bg-[length:200%_200%] animate-gradient-x"><a href="https://twitch.tv/soggsx">Soggs</a></span>.</p>
        </div>
    </footer>
  );
};
