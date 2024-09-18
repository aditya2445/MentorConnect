import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { updateDisplayPicture } from "../../../services/operations/SettingsApi";
import IconBtn from "../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("pic", imageFile);
    dispatch(updateDisplayPicture(token, formData)).then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex items-center justify-between p-6 border border-richblack-700 bg-richblack-800 rounded-lg shadow-md">
      <div className="flex items-center gap-6">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-medium">Change Profile Picture</p>
          <div className="flex gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-500"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-white" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
}