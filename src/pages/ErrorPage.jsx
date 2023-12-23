import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-blue-400">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you are lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let us get you back{" "}
          <Link to="/" className="text-blue-500 font-bold">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
