import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/SettingsApi";
import IconBtn from "../common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitProfileForm = async (data) => {
    console.log(data);
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="lg:w-1/2">
            <label htmlFor="fName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="fName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("fName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.fname && <span className="text-xs text-red-600">Please enter your first name.</span>}
          </div>
          <div className="lg:w-1/2">
            <label htmlFor="lName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("lName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lname && <span className="text-xs text-red-600">Please enter your last name.</span>}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="lg:w-1/2">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("dob", {
                required: true,
                max: new Date().toISOString().split("T")[0],
              })}
              defaultValue={user?.additionalDetails?.dob}
            />
            {errors.dob && <span className="text-xs text-red-600">Invalid date of birth.</span>}
          </div>
          <div className="lg:w-1/2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((gender, index) => (
                <option key={index} value={gender}>{gender}</option>
              ))}
            </select>
            {errors.gender && <span className="text-xs text-red-600">Please select your gender.</span>}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="lg:w-1/2">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              id="about"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="text-xs text-red-600">Please enter your bio.</span>
            )}
          </div>
          <div className="lg:w-1/2">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("contactNumber", {
                required: true,
                minLength: 10,
                maxLength: 12,
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="text-xs text-red-600">
                Please enter a valid contact number (10-12 digits).
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="mr-4 py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </div>
    </form>
  );
}