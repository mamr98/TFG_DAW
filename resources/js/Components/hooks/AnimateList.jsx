import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedList = ({
    items = [],
    onItemSelect,
    enableArrowNavigation = true,
    initialSelectedIndex = -1,
}) => {
    const listRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    // Manejo del scroll para el fade
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(
            scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
        );
    };

    // Manejo de navegación con el teclado
    useEffect(() => {
        if (!enableArrowNavigation) return;
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex((prev) =>
                    Math.min(prev + 1, items.length - 1)
                );
            } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "Enter") {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    // Centrar automáticamente el elemento seleccionado
    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector(
            `[data-index="${selectedIndex}"]`
        );
        if (selectedItem) {
            selectedItem.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav]);

    return (
        <div className="relative w-full  mx-auto">
            {/* Lista con scroll */}
            <div
                ref={listRef}
                onScroll={handleScroll}
                className="w-full max-h-[50vh] overflow-y-auto space-y-4 p-4 bg-[#FDF0D5] shadow-lg rounded-lg dark:bg-[#003049]"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#111827 #253455",
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        data-index={index}
                        className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 text-white text-center ${
                            selectedIndex === index
                                ? "bg-[#253455]"
                                : "bg-gray-900 bg-opacity-75"
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                            setSelectedIndex(index);
                            if (onItemSelect) onItemSelect(item, index);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Gradientes para el fade */}
            <div
                className="absolute top-0 left-0 right-0 h-10 pointer-events-none transition-opacity duration-300 ease-in-out"
                style={{
                    background:
                        "linear-gradient(to bottom, #111827, transparent)",
                    opacity: topGradientOpacity,
                }}
            ></div>
            <div
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none transition-opacity duration-300 ease-in-out"
                style={{
                    background: "linear-gradient(to top, #111827, transparent)",
                    opacity: bottomGradientOpacity,
                }}
            ></div>
        </div>
    );
};

export default AnimatedList;
