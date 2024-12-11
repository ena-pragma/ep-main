import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addNote, findContactByEmail } from "../../../../lib/ghl";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompletionModal({
  isOpen,
  onClose,
}: CompletionModalProps) {
  const navigate = useNavigate();

  const handleOptionSelect = async (option: "schedule" | "callback") => {
    try {
      // Get contact info from session storage
      const contactInfo = JSON.parse(
        sessionStorage.getItem("webDesignContact") || "{}",
      );

      // Find contact by email
      const existingContact = await findContactByEmail(contactInfo.email);
      const contactId = existingContact?.contact?.id;

      if (contactId) {
        // Add note based on selection
        const noteContent =
          option === "schedule"
            ? "Customer selected to schedule kickoff call and process payment."
            : "Customer requested a callback to discuss the project further.";

        await addNote({
          contactId,
          body: noteContent,
        });
      }

      // Navigate based on selection
      if (option === "schedule") {
        navigate("/web-design/booking");
      } else {
        navigate("/thank-you");
      }

      // Clean up session storage
      sessionStorage.removeItem("webDesignContact");
    } catch (error) {
      console.error("Error handling option selection:", error);
      // Still navigate even if note creation fails
      navigate(option === "schedule" ? "/web-design/booking" : "/thank-you");
    }
  };

  return (
    // Rest of the component remains the same
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Submission!
            </h2>

            <p className="text-gray-600 mb-6">
              Let's move forward with your website project! Choose how you'd
              like to proceed:
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleOptionSelect("schedule")}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <span className="font-medium text-blue-900 block">
                      Schedule Kickoff & Payment
                    </span>
                    <span className="text-sm text-blue-600">
                      Process $599 payment and begin your project
                    </span>
                  </div>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>

              <button
                onClick={() => handleOptionSelect("callback")}
                className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <span className="font-medium text-green-900 block">
                      Request a Callback
                    </span>
                    <span className="text-sm text-green-600">
                      Discuss your project before proceeding
                    </span>
                  </div>
                </div>
                <span className="text-green-600 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
