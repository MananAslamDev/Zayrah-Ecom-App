import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "/HeaderLogo.png";
import { useForm, ValidationError } from "@formspree/react";
import {
  Github,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  ArrowRight,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Input = ({ type = "text", placeholder, className, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-md border outline-none transition duration-200 ${className}`}
    {...props}
  />
);

const Textarea = ({ placeholder, className, ...props }) => (
  <textarea
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-md border outline-none transition duration-200 ${className}`}
    {...props}
  />
);

const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-lg shadow-lg text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="mx-auto mb-6 bg-green-100 w-20 h-20 rounded-full flex items-center justify-center"
    >
      <CheckCircle className="text-green-600 w-10 h-10" />
    </motion.div>

    <motion.h3
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-2xl font-bold text-gray-800 mb-2"
    >
      Message Sent!
    </motion.h3>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-gray-600 mb-6"
    >
      Thank you for reaching out. I'll get back to you as soon as possible.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded transition-colors duration-300"
      >
        Send another message <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </motion.div>
  </motion.div>
);

const icons = [
  {
    name: "Github",
    Icon: Github,
    hoverBg: "#4bodod",
    hoverColor: "#FFFFFF",
    url: "https://github.com/MananAslamDev",
  },
  {
    name: "facebook",
    Icon: Facebook,
    hoverBg: "#4bodod",
    hoverColor: "#FFFFFF",
    url: "https://www.facebook.com/mananaslamdev",
  },
  {
    name: "twitter",
    Icon: Twitter,
    hoverBg: "#4bodod",
    hoverColor: "#FFFFFF",
    url: "https://x.com/hellanotmanan",
  },
  {
    name: "linkedin",
    Icon: Linkedin,
    hoverBg: "#4bodod",
    hoverColor: "#FFFFFF",
    url: "https://www.linkedin.com/in/mananaslamdev/",
  },
  {
    name: "instagram",
    Icon: Instagram,
    hoverBg: "#4bodod",
    hoverColor: "#FFFFFF",
    url: "https://www.instagram.com/mananaslamdev/",
  },
];

const Contact = () => {
  const year = new Date().getFullYear();
  const [state, handleSubmit] = useForm("xpwdkzzg");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.succeeded) {
      const element = document.getElementById("contact");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.succeeded]);

  const goToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="contact">
      <div className="bg-white rounded-3xl p-8 md:p-12">
        <h1 className="text-2xl text-[#4b0d0d] font-bold mb-8">CONTACT</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl text-[#4b0d0d] font-bold mb-4">
              Drop Me a Message
            </h3>
            <p className="text-gray-500 mb-6">
              If you have any questions or want to work together, feel free to
              contact me. I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4 text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#4bodod]" />
                </div>
                <a
                  href="tel:+923234594767"
                  className="hover:text-[#4b0d0d] transition-colors duration-200"
                  aria-label="Call +92 323 4594767"
                >
                  +92 323 4594767
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#4bodod]" />
                </div>
                <a
                  href="mailto:mananaslamdev@gmail.com"
                  className="hover:text-[#4b0d0d] transition-colors duration-200"
                  aria-label="Email mananaslamdev@gmail.com"
                >
                  mananaslamdev@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#4bodod]" />
                </div>
                <a
                  href="https://www.google.com/maps/place/Lahore,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4b0d0d] transition-colors duration-200"
                  aria-label="View Lahore, Pakistan on Google Maps"
                >
                  Lahore, Pakistan
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-6 rounded-lg shadow-lg">
            <AnimatePresence>
              {state.succeeded ? (
                <SuccessMessage />
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="bg-[#ffffff] border-[#4bodod] focus:border-[#4bodod]"
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="bg-[#ffffff] border-[#4bodod] focus:border-[#4bodod]"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />

                  <Textarea
                    name="message"
                    placeholder="Message"
                    required
                    className="bg-[#ffffff] border-[#4bodod] focus:border-[#4bodod] min-h-[120px]"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />

                  <Button
                    text={"Send"}
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center justify-center"
                  >
                    {state.submitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <footer className="container mx-auto py-6 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div
              className="logo-container"
              onClick={goToHome}
              style={{ cursor: "pointer" }}
            >
              <img
                src={HeaderLogo}
                alt="Header Logo"
                className="logo w-20 h-20 object-contain rounded"
              />
            </div>
            <span className="ml-2 text-sm text-gray-400">
              © {year} Portfolio. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {icons.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out bg-[#4bodod] shadow-sm hover:shadow-md"
                style={{
                  background:
                    hoveredIcon === item.name ? item.hoverBg : "#4b0d0d",
                }}
                onMouseEnter={() => setHoveredIcon(item.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                aria-label={`Follow us on ${item.name}`}
              >
                <item.Icon
                  className="w-5 h-5 transition-colors duration-300"
                  style={{
                    color:
                      hoveredIcon === item.name ? item.hoverColor : "#FFFFFF",
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
