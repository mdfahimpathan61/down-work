
import React from "react";
import { Link } from "react-router";
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import logo from "/logo3.png";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const {activeUser} = useAuth()
  //console.log(activeUser)
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/mdfahimpathan61/",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/mdfahimpathan61",
    },
    {
      name: "X",
      icon: <FaXTwitter />,
      url: "https://x.com/mdfahimpathan61",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1733] text-white">
      <div className="max-w-360 mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-6">

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10">

          {/* Brand Section */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Down Work logo"
                className="w-12 h-12 rounded-full object-cover"
              />

              <span className="text-2xl font-bold tracking-tight">
                Down <span className="text-primary">Work</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Find your next opportunity. Build your next chapter.
              Your journey to a better career starts here.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Down Work on ${social.name}`}
                  title={social.name}
                  className="flex items-center justify-center w-10 h-10 rounded-xl
                  border border-white/15 text-slate-300
                  hover:bg-secondary hover:text-white
                  hover:border-primary/70 hover:-translate-y-1
                  transition-all duration-300 shadow-sm shadow-primary/50"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/category/all"
                  className="hover:text-primary transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>

              {
                activeUser ? "" : <>
                <li>
                <Link
                  to="/auth/login"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/auth/role"
                  className="hover:text-primary transition-colors"
                >
                  Create Account
                </Link>
              </li>
                
                </>
              }
            </ul>
          </div>

          {/* Footer Message */}
          <div className="max-w-xs">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Purpose
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Every career has a beginning. We are here to help you
              discover opportunities and take the next step forward.
            </p>

            <p className="mt-3 text-sm font-medium italic text-white/80">
              "Your next opportunity starts here."
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs sm:text-sm text-slate-400">
          <p>
            © {currentYear} Down Work. All rights reserved.
          </p>

          <p>
            Built with <span className="text-red-400">♥</span> for your
            next career move.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;