import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// show the 3 little horizontal bars
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

import NavigationMenu from "./NavigationMenu";

function Navigation() {
    // create a variable to showmenu which is a state to determine to show the menu
    // 2. function setShowMenu will change teh avalue of the above the variable
    // 3. use setState hook to change the value. Initial value is false
    const [showMenu, setShowMenu] = useState(false);

    const maskTransitions = useTransition(showMenu, null, {
        from: { position: "absolute", opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const menuTransitions = useTransition(showMenu, null, {
        from: { opacity: 0, transform: "translateX(-100%)" },
        enter: { opacity: 1, transform: "translateX(0%)" },
        leave: { opacity: 0, transform: "translateX(-100%)" },
    });

    return (
        <nav>
            <span className="text-xl">
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </span>

            {/* // empty black background that fades in and out */}
            {maskTransitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.div
                            key={key}
                            style={props}
                            className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                            onClick={() => setShowMenu(false)}
                        ></animated.div>
                    )
            )}

            {menuTransitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.div
                            key={key}
                            style={props}
                            className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow p-3"
                        >
                            {/* pass the setShowMenu function to props to child component NavigationMenu.js */}
                            <NavigationMenu
                                closeMenu={() => setShowMenu(false)}
                            />
                        </animated.div>
                    )
            )}
        </nav>
    );
}

export default Navigation;
