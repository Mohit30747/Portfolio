import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading messages...</div>;
  if (error) return <div className="text-red-500 text-center p-10">Error: {error}</div>;

  return (
    <div className="min-h-screen text-white p-10 page-panel">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Messages</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-400">Name:</h3>
                  <p>{msg.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">Email:</h3>
                  <p>{msg.email}</p>
                </div>
                {msg.phone && (
                  <div>
                    <h3 className="font-semibold text-blue-400">Phone:</h3>
                    <p>{msg.phone}</p>
                  </div>
                )}
                {msg.address && (
                  <div>
                    <h3 className="font-semibold text-blue-400">Address:</h3>
                    <p>{msg.address}</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-blue-400">Message:</h3>
                <p className="mt-2">{msg.message}</p>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Received: {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}