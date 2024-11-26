import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    if (formattedPhone.replace(/\D/g, "").length <= 10) {
      setFormData((prev) => ({ ...prev, phone: formattedPhone }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Please enter a valid US phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_k16449m",
        "template_96s3t1s",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          phone_number: formData.phone,
          to_name: "Ena Pragma",
          to_email: "lead@enapragma.co",
        },
        "MmsYK_LUSPvb-GS-u",
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.id === "phone") return;
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-black text-white">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business? Let's talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-gray-300">info@enapragma.co</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-1">Phone</h3>
                <p className="text-gray-300">(251) 725-9969</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1" />
              <div>
                <h3 className="text-lg font-medium mb-1">Location</h3>
                <p className="text-gray-300">
                  10268 Oak Lane
                  <br />
                  Grand Bay, AL 36541
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/enapragma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/enapragma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/enapragma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
