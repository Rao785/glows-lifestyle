// import { useState, useEffect, useCallback } from "react";

// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// // ProductCard Component - Enhanced
// const ProductCard = ({ product, loading }) => {
//     // const dispatch = useDispatch();
//     const [userId, setUserId] = useState(null);
//     const [isAddingToCart, setIsAddingToCart] = useState(false);
//     const [isBuyingNow, setIsBuyingNow]  = useState(false);
//     const [showToast, setShowToast] = useState(false);
//     const [toastMessage, setToastMessage] = useState("");
//     const [toastType, setToastType] = useState("success"); // success or error

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) {
//             console.log("No user found in localStorage");
//             return; // Avoid throwing an error
//         }

//         const user = JSON.parse(storedUser); // Convert string to object
//         setUserId(user?.id || ""); // Ensure safe state update


//     }, []);

//     const showNotification = (message, type = "success") => {
//         setToastMessage(message);
//         setToastType(type);
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//     };

//     const addToCart = async (productId, buyNow = false) => {
//         console.log("Adding to cart:", productId);
//         if (!userId) {
//             showNotification("Please login to add items to cart", "error");
//             return;
//         }

//         if (buyNow) {
//             setIsBuyingNow(true);
//         } else {
//             setIsAddingToCart(true);
//         }

//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
//                 productId,
//                 userId
//             });

//             showNotification(response.data.message);

//             // If buying now, redirect to cart page
//             if (buyNow) {
//                 // You could also use dispatch to navigate via redux
//                 window.location.href = '/profile';
//             }
//         } catch (error) {
//             console.error("Error:", error.response?.data?.message || error.message);
//             showNotification(
//                 "Error: " + (error.response?.data?.message || error.message),
//                 "error"
//             );
//         } finally {
//             setIsAddingToCart(false);
//             setIsBuyingNow(false);
//         }
//     };

//     // Show skeleton loading state
//     if (loading) {
//         return (
//             <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
//                 <div className="relative">
//                     <div className="w-full h-52 bg-gray-300 animate-pulse" />
//                     <div className="absolute top-2 left-2 bg-gray-400 text-transparent px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                         <span className="w-12 h-4 bg-gray-300"></span>
//                     </div>
//                 </div>
//                 <div className="p-4">
//                     <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
//                     <div className="flex items-center gap-2 mt-2">
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                         <div className="w-24 h-4 bg-gray-300 animate-pulse" />
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                         <div className="w-16 h-4 bg-gray-300 animate-pulse" />
//                     </div>
//                     <div className="flex flex-col gap-2 mt-4">
//                         <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
//                         <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Calculate discounted price if not already calculated
//     const calculatedPrice = product.price;
//     const originalPrice = product.originalPrice ||
//         (product.discount > 0 ? (calculatedPrice / (1 - product.discount / 100)).toFixed(2) : calculatedPrice);

//     return (
//         <div className="border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
//             {/* Product Image and Discount Badge */}
//             <Link to={`/product/${product._id}`} className="block">
//                 <div className="relative group">
//                     <img
//                         src={product.img[0]}
//                         alt={product.name}
//                         className="w-full h-52 object-cover transition-all duration-300 group-hover:brightness-95"
//                     />
//                     {product.discount > 0 && (
//                         <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                             -{product.discount}%
//                         </div>
//                     )}
//                     {product.stock <= 5 && product.stock > 0 && (
//                         <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
//                             Only {product.stock} left
//                         </div>
//                     )}
//                     {product.stock === 0 && (
//                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                             <span className="text-white text-lg font-bold">Out of Stock</span>
//                         </div>
//                     )}
//                     {product.img.length > 1 && (
//                         <div className="absolute bottom-2 right-2 flex gap-1">
//                             {[...Array(Math.min(3, product.img.length))].map((_, i) => (
//                                 <div key={i} className="w-2 h-2 rounded-full bg-white opacity-70"></div>
//                             ))}
//                             {product.img.length > 3 && <div className="w-2 h-2 rounded-full bg-white opacity-70">+</div>}
//                         </div>
//                     )}
//                 </div>

//                 {/* Product Information */}
//                 <div className="p-4">
//                     <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
//                     <div className="flex items-center gap-2 mt-2">
//                         {product.discount > 0 && (
//                             <span className="text-gray-400 line-through text-sm">{originalPrice} د.إ</span>
//                         )}
//                         <span className="text-green-600 font-bold text-lg">{calculatedPrice} د.إ</span>
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                         {product.category && <span className="font-medium">{product.category}</span>}
//                     </div>
//                     <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//                         {product.category && <span className="font-medium font-bold">{product.tagline}</span>}
//                     </div>
//                 </div>
//             </Link>
//             {/* Action Buttons */}
//             <div className="p-4 flex flex-col gap-2">
//                 <button
//                     onClick={() => addToCart(product._id)}
//                     disabled={isAddingToCart || product.stock === 0}
//                     className={`w-full text-black text-md px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${product.stock === 0
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-gray-100 border-2 border-black text-black hover:bg-black hover:text-white"
//                         }`}
//                 >
//                     {isAddingToCart ? (
//                         <span className="flex items-center justify-center">
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Adding...
//                         </span>
//                     ) : (
//                         "ADD TO CART"
//                     )}
//                 </button>
//                 <button
//                     onClick={() => addToCart(product._id, true)}
//                     disabled={isBuyingNow || product.stock === 0}
//                     className={`w-full text-white text-md px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${product.stock === 0
//                         ? "bg-blue-300 cursor-not-allowed"
//                         : "bg-black "
//                         }`}
//                 >
//                     {isBuyingNow ? (
//                         <span className="flex items-center justify-center">
//                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                         </span>
//                     ) : (
//                         "BUY NOW"
//                     )}
//                 </button>
//             </div>
//             {/* Toast Notification */}
//             {showToast && (
//                 <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${toastType === "success" ? "bg-green-500" : "bg-red-500"
//                     } text-white`}>
//                     {toastMessage}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductCard;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "./Alert"; // Import the AlertMessage component
const ProductCard = ({ product, loading }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isBuyingNow, setIsBuyingNow] = useState(false);

    // Alert state
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        type: "success"
    });

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserId(user?.id || "");
            }
        } catch (error) {
            console.error("Error retrieving user from localStorage:", error);
        }
    }, []);

    const showAlert = (message, type = "success") => {
        setAlert({
            show: true,
            message,
            type
        });
    };

    const hideAlert = () => {
        setAlert({
            ...alert,
            show: false
        });
    };

    const addToCart = async (productId, buyNow = false) => {
        console.log("Adding to cart:", productId);
        if (!userId) {
            showAlert("Please login to add items to cart", "error");
            return;
        }

        // Set the appropriate loading state
        if (buyNow) {
            setIsBuyingNow(true);
        } else {
            setIsAddingToCart(true);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product/add-to-cart`, {
                productId,
                userId
            });

            showAlert(response.data.message, "success");

            // If buying now, redirect to cart page after successful addition
            if (buyNow) {
                setTimeout(() => {
                    navigate('/profile');
                }, 1000); // Short delay to show the success message
            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to add product to cart";
            showAlert(errorMessage, "error");
        } finally {
            // Reset loading states
            setIsAddingToCart(false);
            setIsBuyingNow(false);
        }
    };

    // Show skeleton loading state
    if (loading) {
        return (
            <div className="border rounded-xl shadow-lg overflow-hidden bg-white">
                <div className="relative">
                    <div className="w-full h-52 bg-gray-300 animate-pulse" />
                    <div className="absolute top-2 left-2 bg-gray-400 text-transparent px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                        <span className="w-12 h-4 bg-gray-300"></span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="w-full h-6 bg-gray-300 animate-pulse mb-2"></div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-16 h-4 bg-gray-300 animate-pulse" />
                        <div className="w-24 h-4 bg-gray-300 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                        <div className="w-16 h-4 bg-gray-300 animate-pulse" />
                        <div className="w-16 h-4 bg-gray-300 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
                        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate discounted price if not already calculated
    const calculatedPrice = product.price;
    const originalPrice = product.price ||
        (product.discount > 0 ? (calculatedPrice / (1 - product.discount / 100)).toFixed(2) : calculatedPrice);

    return (
        <>
            {/* Alert Message Component */}
            {alert.show && (
                <AlertMessage
                    message={alert.message}
                    type={alert.type}
                    onClose={hideAlert}
                    duration={5000}
                    showCloseButton={true}
                />
            )}

            <div className="border rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
                {/* Product Image and Discount Badge */}
                <Link to={`/product/${product._id}`} className="block">
                    <div className="relative group">
                        <img
                            src={product.img[0]}
                            alt={product.name}
                            className="w-full h-52 object-cover transition-all duration-300 group-hover:brightness-95"
                        />
                        {/* {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                -{product.discount}%
                            </div>
                        )} */}


                        {product.stock <= 5 && product.stock > 0 && (
                            <div className="absolute top-2 right-2 bg-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                                Only {product.stock} left
                            </div>
                        )}
                        {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">Out of Stock</span>
                            </div>
                        )}
                        {product.img.length > 1 && (
                            <div className="absolute bottom-2 right-2 flex gap-1">
                                {[...Array(Math.min(3, product.img.length))].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-white opacity-70"></div>
                                ))}
                                {product.img.length > 3 && <div className="w-2 h-2 rounded-full bg-white opacity-70">+</div>}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-2">

                            <span className="text-gray-400 line-through text-lg">{product.price}</span>

                            <span className="text-black-600 font-bold text-lg">RS {product.discountPrice}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                            {product.category && <span className="font-medium">{product.category}</span>}
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                            {product.tagline && <span className="font-medium font-bold">{product.tagline}</span>}
                        </div>
                    </div>
                </Link>
                {/* Action Buttons */}
                <div className="p-4 flex flex-col gap-2">
                    <button
                        onClick={() => addToCart(product._id)}
                        disabled={isAddingToCart || product.stock === 0}
                        className={`w-full text-black text-md px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${product.stock === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-100 border-2 border-black text-black hover:bg-black hover:text-white"
                            }`}
                    >
                        {isAddingToCart ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </span>
                        ) : (
                            "ADD TO CART"
                        )}
                    </button>
                    <button
                        onClick={() => addToCart(product._id, true)}
                        disabled={isBuyingNow || product.stock === 0}
                        className={`w-full text-white text-md px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 ${product.stock === 0
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {isBuyingNow ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            "BUY NOW"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;