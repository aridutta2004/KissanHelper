import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Trash2, MailOpen, Mail } from "lucide-react";

const Notification = ({ notification, markAsRead, deleteNotification }) => {
  const { id, title, message, timestamp, read, category } = notification;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 rounded-lg border ${
        read ? "bg-gray-800 border-gray-700" : "bg-gray-800/50 border-green-500/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            {!read && (
              <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-500 rounded-full">
                New
              </span>
            )}
          </div>
          <p className="text-gray-400 mt-1">{message}</p>
          <p className="text-sm text-gray-500 mt-2">{formatTimestamp(timestamp)}</p>
        </div>
        <div className="flex items-center gap-2">
          {!read && (
            <button
              onClick={() => markAsRead(id)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Mark as read"
            >
              <Mail size={18} />
            </button>
          )}
          <button
            onClick={() => deleteNotification(id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return isNaN(date) ? "Invalid date" : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
};

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setNotifications([
      {
        id: "1",
        title: "New User Registration",
        message: "A new farmer has registered on the platform. Please review their application.",
        timestamp: "2024-03-20T10:30:00",
        read: false,
        category: "user",
      },
      {
        id: "2",
        title: "System Update",
        message: "New features have been added to the platform. Check the changelog for details.",
        timestamp: "2024-03-19T15:45:00",
        read: false,
        category: "system",
      },
      {
        id: "3",
        title: "Payment Received",
        message: "New premium subscription payment received from user #12345.",
        timestamp: "2024-03-18T09:20:00",
        read: true,
        category: "payment",
      },
    ]);
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="h-8 w-8 text-green-500" />
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="user">User</option>
              <option value="system">System</option>
              <option value="payment">Payment</option>
            </select>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MailOpen size={18} />
              Mark All as Read
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Notifications</h3>
              <p className="text-gray-400">You're all caught up! Check back later for new notifications.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
