import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { PolyMindContext } from "../context/context";

function SubscriptionPopup() {
  const { isSubscribed, user, isLoggedIn } = useContext(PolyMindContext);
  const location = useLocation();

  if (
    !isLoggedIn ||
    isSubscribed ||
    user?.isAdmin ||
    location.pathname === "/payment"
  ) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000090] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#18181B] p-8 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold mb-4">Aboneliğiniz Sona Erdi</h1>
        <p className="text-gray-400 mb-6">
          Aboneliğinizin süresi doldu. Lütfen aboneliğinizi yenileyin.
        </p>
        <Link
          to="/payment"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Aboneliği Yenile
        </Link>
      </div>
    </div>
  );
}

export default SubscriptionPopup;
