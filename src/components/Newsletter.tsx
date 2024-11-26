import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { addContact } from "../lib/ghl";
import toast from "react-hot-toast";

interface NewsletterProps {
  locationId: string;
  apiKey: string;
  variant?: "minimal" | "card" | "inline";
}

export default function Newsletter({ variant = "minimal" }: NewsletterProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addContact(data.email, data.name);
      toast.success("Successfully subscribed to newsletter!");
      setData({ name: "", email: "" });
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8">
            Join our newsletter for expert insights on business growth and
            technology.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
            />
            <div className="flex gap-3">
              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
