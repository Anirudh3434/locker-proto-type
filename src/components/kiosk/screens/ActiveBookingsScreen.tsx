import { motion } from "framer-motion";
import { ArrowLeft, Package, Clock, MapPin, Search } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

interface Booking {
  id: string;
  lockerNumber: string;
  parcelSize: "Small" | "Medium" | "Large";
  dropOffTime: string;
  status: "Ready for Collection";
}

const dummyBookings: Booking[] = [
  {
    id: "BK-2024-001",
    lockerNumber: "A-12",
    parcelSize: "Medium",
    dropOffTime: "2 hours ago",
    status: "Ready for Collection",
  },
  {
    id: "BK-2024-002",
    lockerNumber: "B-05",
    parcelSize: "Small",
    dropOffTime: "5 hours ago",
    status: "Ready for Collection",
  },
  {
    id: "BK-2024-003",
    lockerNumber: "C-18",
    parcelSize: "Large",
    dropOffTime: "1 day ago",
    status: "Ready for Collection",
  },
];

interface ActiveBookingsScreenProps {
  onSelectBooking: (booking: Booking) => void;
  onBack: () => void;
}

export const ActiveBookingsScreen = ({ onSelectBooking, onBack }: ActiveBookingsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = useMemo(() => {
    return dummyBookings.filter(
      (booking) =>
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.lockerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.parcelSize.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#320367] to-[#2DC8DA] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Package className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ACTIVE BOOKINGS
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Select a parcel to collect
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by booking ID, locker number, or parcel size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-transparent border-border"
            />
          </div>
        </motion.div>

        {/* Booking Cards */}
        <div className="space-y-4 mb-10">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
            <motion.button
              key={booking.id}
              className="w-full p-6 rounded-2xl glass border-none transition-all duration-300 text-left cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectBooking(booking)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#320367] to-[#2DC8DA] flex items-center justify-center">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-black mb-1">
                      {booking.id}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Locker {booking.lockerNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.dropOffTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 shadow shadow-color-primary/80 text-gray-500 text-sm font-medium">
                    {booking.parcelSize}
                  </span>
                  <p className="text-xs text-secondary mt-2 font-medium">
                    {booking.status}
                  </p>
                </div>
              </div>
            </motion.button>
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">No bookings found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </div>

        {/* Back Button */}
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ActionButton
            icon={ArrowLeft}
            label="Back"
            variant="ghost"
            onClick={onBack}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
