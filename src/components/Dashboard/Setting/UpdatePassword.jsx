// UpdatePassword Component
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../services/operations/SettingsApi";
import IconBtn from "../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const submitPasswordForm = async (data) => {
    console.log(data);
    try {
      dispatch(changePassword(token, data));
      reset();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const newPassword = watch("newPassword");

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Update Password</h2>

        <div className="flex flex-col gap-6 mb-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("oldPass", { required: true })}
            />
            {errors.currentPassword && (
              <span className="text-xs text-red-600">Please enter your current password.</span>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPass" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("newPass", {
                required: true,
                minLength: 8,
                validate: (value) => /^(?=.[a-z])(?=.[A-Z])(?=.*\d).+$/.test(value),
              })}
            />
            {errors.newPassword && (
              <span className="text-xs text-red-600">
                Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number.
              </span>
            )}
          </div>

          {/* Confirm New Password */}
          {/* <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === newPassword || "Passwords do not match.",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-red-600">{errors.confirmPassword.message}</span>
            )}
          </div> */}
        </div>

        <div className="flex justify-end">
          <IconBtn type="submit" text="Update Password" />
        </div>
      </div>
    </form>
  );
}