import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import CustomAuthForm from "../../components/Auth/CustomAuthForm";
import { AuthContext } from "../../context/AuthContextProvider";
import { registerUser } from "../../services/apis/User";
import handleError from "../../utils/handleError";
import { WebsiteContext } from "../../context/WebsiteContextProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { websiteInfo } = useContext(WebsiteContext);

  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState(false);
  const [formReset, setFormReset] = useState(false);

  // Function to handle user registration
  const handleRegister = async (data) => {
    // Extract user data from the input
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      // Set form submission in progress flag to true
      setFormSubmit(true);

      // Step 1: Register user data to MongoDB
      const response = await registerUser(userData);

      // Check if MongoDB registration was successful
      if (response.user.email) {
        // Step 2: Register user to Firebase authentication

        const result = await createUser(userData.email, userData.password);

        // Check if Firebase registration was successful
        if (result.user.email) {
          // Step 3: Update user profile
          await updateUserProfile(userData.name, data?.photo);
        }
      }

      // Step 4: Redirect to the home page and show success message
      navigate("/");
      toast.success(response.message);
      setFormReset(true);
    } catch (error) {
      // If any error occurs during registration, show an error message
      toast.error(handleError(error));
    } finally {
      // Set form submission in progress flag to false regardless of success or failure
      setFormSubmit(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | {websiteInfo?.name || ""}</title>
      </Helmet>

      <div
        className="bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}
      >
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Link to="/">
                  <img
                    className="object-cover w-14 h-14 mx-2 rounded-full"
                    src={websiteInfo?.logoUrl}
                    alt="logo"
                  />
                </Link>
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300 capitalize">
                Create your WishCraft account
              </p>
            </div>
            <div className="mt-4 mb-8 flex flex-col items-center">
              <div className="w-full flex-1">
                <div className="mx-auto max-w-xs">
                  {/* custom Register form */}
                  <CustomAuthForm
                    buttonText="Register"
                    onSubmit={handleRegister}
                    formSubmit={formSubmit}
                    formReset={formReset}
                  />

                  <p className="mt-6 text-sm text-center text-gray-400">
                    Do you have an account?{" "}
                    <Link
                      to="/auth/login"
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      Login
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;