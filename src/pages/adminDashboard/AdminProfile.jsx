// src/pages/AdminProfile.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePic, uploadProfilePic } from "../../features/adminProfileSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const savedPic = useSelector((s) => s.profile.profilePic);
  const uploadStatus = useSelector((s) => s.profile.status);

  // editable data
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");

  const [isEditing, setIsEditing] = useState(false);

  const [localFile, setLocalFile] = useState(null);
  const [preview, setPreview] = useState(savedPic || null);

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    let uploadedURL = preview;

    // upload profile picture if new file selected
    if (localFile) {
      const resultAction = await dispatch(uploadProfilePic(localFile));

      if (uploadProfilePic.fulfilled.match(resultAction)) {
        uploadedURL = resultAction.payload.url;
      } else {
        dispatch(setProfilePic(preview));
      }
    }

    // TODO: send name/email update to backend API
    console.log("Saved details:", { name, email, uploadedURL });

    alert("Profile updated successfully!");

    setIsEditing(false);
  }

  return (
    <div className="min-h-screen w-full bg-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8 relative">

        {/* Edit / Save buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow-md text-sm"
              disabled={uploadStatus === "loading"}
            >
              {uploadStatus === "loading" ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview || "/default-profile.png"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
          />

          {isEditing && (
            <label className="cursor-pointer bg-blue-600 px-6 py-2 rounded-lg text-white text-sm hover:bg-blue-700 shadow-md">
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Editable Admin Info */}
        <div className="mt-10 space-y-4 text-gray-700">

          {/* Name */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold">Name:</span>

            {isEditing ? (
              <input
                type="text"
                className="border p-2 rounded-lg w-2/3 bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold">Email:</span>

            {isEditing ? (
              <input
                type="email"
                className="border p-2 rounded-lg w-2/3 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <span>{email}</span>
            )}
          </div>

          {/* Role (static) */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold">Role:</span>
            <span>Administrator</span>
          </div>

        </div>
      </div>
    </div>
  );
}
