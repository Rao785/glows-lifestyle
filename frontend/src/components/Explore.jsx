
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const navigate = useNavigate();
    // Enhanced data with more information and options
    const data = [
        {
            id: 1,
            category: "Earbuds",
            description: "Premium Quality Earbuds",
            images: [
                "/images/explore/earbuds.gif",
            ],
            featured: true,
            new: false,
            bestseller: true,
            btn: "Shop Earbuds",
        },
        {
            id: 2,
            category: "Smartwatches",
            description: "Innovative tech for modern lifestyle",
            productCount: 36,
            images: [
                "/images/explore/smartwatch.webp",
            ],
            featured: true,
            new: true,
            bestseller: false,
            btn: "Shop Smartwatch",
        },
        {
            id: 3,
            category: "HeadPhones",
            description: "Stylish & functional Headphones for every occasion",
            productCount: 18,
            images: [
                "/images/explore/headphone.webp",
            ],
            featured: false,
            new: false,
            bestseller: true,
            btn: "Shop Headphones",
        },

    ];

    // Animation control states
    const [activeCategory, setActiveCategory] = useState(null);
    const [currentImageIndices, setCurrentImageIndices] = useState(
        data.map(() => 0)
    );
    const [fadeKeys, setFadeKeys] = useState(data.map(() => 0));
    const [animationPaused, setAnimationPaused] = useState(
        data.map(() => false)
    );

    // Filter controls
    const [filterType, setFilterType] = useState("all");
    const filteredData = filterType === "all"
        ? data
        : data.filter(item => item[filterType]);

    // Intersection Observer for animation-on-scroll
    const categoryRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('appear');
                    }
                });
            },
            { threshold: 0.2 }
        );

        categoryRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            categoryRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [filteredData.length]);

    // Image rotation effect
    useEffect(() => {
        const intervals = data.map((category, categoryIndex) =>
            setInterval(() => {
                if (!animationPaused[categoryIndex]) {
                    setCurrentImageIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        const currentIndex = newIndices[categoryIndex];
                        const nextIndex = (currentIndex + 1) % category.images.length;
                        newIndices[categoryIndex] = nextIndex;
                        return newIndices;
                    });

                    // Trigger fade animation
                    setFadeKeys((prevKeys) => {
                        const newKeys = [...prevKeys];
                        newKeys[categoryIndex] += 1;
                        return newKeys;
                    });
                }
            }, 2000)
        );

        return () => {
            intervals.forEach(clearInterval);
        };
    }, [animationPaused]);

    // Handle mouse interactions
    const handleMouseEnter = (index) => {
        setActiveCategory(index);
        setAnimationPaused(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const handleMouseLeave = (index) => {
        setActiveCategory(null);
        setAnimationPaused(prev => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    // Manual image navigation
    const navigateImage = (categoryIndex, direction) => {
        setCurrentImageIndices(prevIndices => {
            const newIndices = [...prevIndices];
            const category = data[categoryIndex];
            const currentIndex = prevIndices[categoryIndex];

            if (direction === 'next') {
                newIndices[categoryIndex] = (currentIndex + 1) % category.images.length;
            } else {
                newIndices[categoryIndex] = currentIndex === 0
                    ? category.images.length - 1
                    : currentIndex - 1;
            }

            return newIndices;
        });

        // Trigger fade animation
        setFadeKeys(prevKeys => {
            const newKeys = [...prevKeys];
            newKeys[categoryIndex] += 1;
            return newKeys;
        });
    };
    const hanldeCategory = (category) => {
        const newcategory = category.toLowerCase()
        navigate(`/product/categories/${newcategory}`)
    }

    return (
        <div className="py-16 px-4 border-b-6 border-white">
            <div className="max-w-6xl mx-auto">
                {/* heading */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Explore Collections</h2>
                        <p className="text-gray-600 max-w-xl">Discover our curated selection of premium products designed for modern living.</p>
                    </div>

                    {/* btns title eg:bestseller , new  */}
                    <div className="flex space-x-2 mt-6 sm:mt-0">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('new')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'new'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            New
                        </button>
                        <button
                            onClick={() => setFilterType('bestseller')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'bestseller'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Bestsellers
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.map((item, categoryIndex) => {
                        const actualIndex = data.findIndex(d => d.id === item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => { hanldeCategory(item.category) }}

                                ref={el => categoryRefs.current[categoryIndex] = el}
                                className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 opacity-0 translate-y-8 scale-95 group"
                                style={{ height: "420px" }}
                                onMouseEnter={() => handleMouseEnter(actualIndex)}
                                onMouseLeave={() => handleMouseLeave(actualIndex)}
                            >
                                {/* Image Container with improved transition */}
                                <div className="absolute inset-0 w-full h-full bg-gray-200">
                                    <img
                                        key={fadeKeys[actualIndex]}
                                        src={item.images[currentImageIndices[actualIndex]]}
                                        alt={`Explore ${item.category}`}
                                        className="absolute inset-0 w-full h-full object-cover opacity-0  transform scale-105 group-hover:scale-110 transition-transform duration-7000"
                                        onLoad={(e) => e.target.classList.replace("opacity-0", "opacity-100")}
                                    />

                                    {/* Manual navigation arrows - only visible on hover */}
                                    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 transition-opacity duration-300 ${activeCategory === actualIndex ? 'opacity-100' : ''}`}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateImage(actualIndex, 'prev');
                                            }}
                                            className="bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10"
                                            aria-label="Previous image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6"></polyline>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateImage(actualIndex, 'next');
                                            }}
                                            className="bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10"
                                            aria-label="Next image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Image pagination indicators */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                        {item.images.map((_, imgIndex) => (
                                            <button
                                                key={imgIndex}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndices(prev => {
                                                        const newIndices = [...prev];
                                                        newIndices[actualIndex] = imgIndex;
                                                        return newIndices;
                                                    });
                                                    setFadeKeys(prev => {
                                                        const newKeys = [...prev];
                                                        newKeys[actualIndex] += 1;
                                                        return newKeys;
                                                    });
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndices[actualIndex] === imgIndex
                                                    ? 'bg-white w-6'
                                                    : 'bg-white/50'
                                                    }`}
                                                aria-label={`View image ${imgIndex + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Enhanced gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex space-x-2 z-10">
                                    {item.new && (
                                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            New
                                        </span>
                                    )}
                                    {item.bestseller && (
                                        <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            Bestseller
                                        </span>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10 transition-transform duration-500 transform translate-y-0 group-hover:translate-y-0">
                                    <div className="mb-1 opacity-90 text-sm font-medium">{item.productCount} Products</div>
                                    <h3 className="text-3xl font-bold mb-2">{item.category}</h3>
                                    <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.description}</p>
                                    <button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center group-hover:shadow-lg transition-all duration-300">
                                        {item.btn}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .appear {
                    animation: appear 0.8s forwards;
                    animation-delay: calc(var(--index) * 0.1s);
                }
                
                @keyframes appear {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Explore;