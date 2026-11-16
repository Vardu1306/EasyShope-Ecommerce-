
import React, { useState, useEffect } from "react";
import "./AdminMessages.css";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Load messages
  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("shopeaseMessages")) || [];

    setMessages(savedMessages);
  }, []);

  // Delete message
  const handleDelete = (id) => {
    const updatedMessages = messages.filter(
      (message) => message.id !== id
    );

    setMessages(updatedMessages);

    localStorage.setItem(
      "shopeaseMessages",
      JSON.stringify(updatedMessages)
    );

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  // Search messages
  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase()) ||
    message.email.toLowerCase().includes(search.toLowerCase()) ||
    message.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-messages-page">
      <div className="admin-messages-header">
        <div>
          <h1>Customer Messages</h1>
          <p>View and manage customer enquiries.</p>
        </div>

        <div className="admin-messages-count">
          <span>Total Messages</span>
          <h2>{messages.length}</h2>
        </div>
      </div>

      <div className="admin-messages-search">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="admin-messages-table-container">
        <table className="admin-messages-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <tr key={message.id}>
                  <td>{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.subject}</td>
                  <td>{message.date}</td>

                  <td className="admin-message-actions">
                    <button
                      className="message-view-btn"
                      onClick={() => setSelectedMessage(message)}
                    >
                      View
                    </button>

                    <button
                      className="message-delete-btn"
                      onClick={() => handleDelete(message.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="admin-messages-empty">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Message Details */}
      {selectedMessage && (
        <div className="admin-message-modal">
          <div className="admin-message-modal-content">
            <div className="admin-message-modal-header">
              <h2>Message Details</h2>

              <button
                className="message-close-btn"
                onClick={() => setSelectedMessage(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-message-detail">
              <label>Customer Name</label>
              <p>{selectedMessage.name}</p>
            </div>

            <div className="admin-message-detail">
              <label>Email Address</label>
              <p>{selectedMessage.email}</p>
            </div>

            <div className="admin-message-detail">
              <label>Subject</label>
              <p>{selectedMessage.subject}</p>
            </div>

            <div className="admin-message-detail">
              <label>Message</label>
              <p>{selectedMessage.message}</p>
            </div>

            <div className="admin-message-detail">
              <label>Date</label>
              <p>{selectedMessage.date}</p>
            </div>

            <button
              className="message-modal-close"
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
