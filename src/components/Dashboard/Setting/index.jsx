import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-richblack-900 rounded-lg shadow-lg">
      <h1 className="mb-10 text-4xl font-semibold text-richblack-5 text-center">
        Edit Profile
      </h1>
      <div className="space-y-12">
        {/* Change Profile Picture */}
        <ChangeProfilePicture />
        {/* Edit Profile */}
        <EditProfile />
        {/* Update Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  );
}