"use client";

import { useState, useEffect } from "react";
import {
    Home,
    Search,
    ShoppingCart,
    User,
    Menu,
    Sun,
    Moon,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Head } from "@inertiajs/react";

type products = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
};

export default function EcommercePage({ products }: { products: products[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [darkMode, setDarkMode] = useState(false);

    // useEffect(() => {
    //     if (darkMode) {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }
    // }, [darkMode]);

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    return (
        <>
        <Head title="Home" />
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Desktop Header */}
                <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 hidden md:block">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold">FashionStore</h1>
                        <nav>
                            <ul className="flex space-x-6">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-64 bg-white dark:bg-gray-700"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Shopping cart</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                <User className="h-5 w-5" />
                                <span className="sr-only">User profile</span>
                            </Button>
                            {/* <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleDarkMode}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            {darkMode ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button> */}
                        </div>
                    </div>
                </header>

                {/* Mobile Header */}
                <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-700 dark:text-gray-300"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                    <h1 className="text-xl font-bold">FashionStore</h1>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                        {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleDarkMode}
                        className="text-gray-700 dark:text-gray-300"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button> */}
                    </div>
                </header>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 md:hidden">
                        <div className="p-4 flex flex-col h-full">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="self-end mb-4 text-gray-700 dark:text-gray-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </Button>
                            <nav className="flex-grow">
                                <ul className="space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Products
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-grow container mx-auto px-4 py-8 pb-24 md:pb-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={
                                        `/storage/product/thumbnails/` +
                                        product.thumbnail
                                    }
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            currencyDisplay: "narrowSymbol",
                                            minimumFractionDigits: 0,
                                        }).format(product.price)}
                                    </p>
                                    <Button className="w-full mt-4">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md py-3 px-6 md:hidden">
                    <ul className="flex justify-around">
                        <li>
                            <a
                                href="#"
                                className="flex flex-col items-center text-gray-700 dark:text-gray-300"
                            >
                                <Home className="h-6 w-6" />
                                <span className="text-xs mt-1">Home</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex flex-col items-center text-gray-700 dark:text-gray-300"
                            >
                                <Search className="h-6 w-6" />
                                <span className="text-xs mt-1">Search</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex flex-col items-center text-gray-700 dark:text-gray-300"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span className="text-xs mt-1">Cart</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex flex-col items-center text-gray-700 dark:text-gray-300"
                            >
                                <User className="h-6 w-6" />
                                <span className="text-xs mt-1">Profile</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
