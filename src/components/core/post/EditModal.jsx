import React, { useState } from "react";

export function EditModal({ post, isOpen, onClose, onSave }) {
    console.log(post)
    const [content, setContent] = useState(post.content);
  
    const handleSave = () => {
      onSave(post._id, content);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Post</h2>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  