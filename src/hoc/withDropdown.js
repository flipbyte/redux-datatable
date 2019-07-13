import React, { useState, useEffect, useRef } from 'react';
import { ROLE_MENU_ITEM } from '../constants';

const events = ['click', 'touchstart', 'keyup'];
const getMenuItems = (element) => [].slice.call(element.querySelectorAll(`[role="${ROLE_MENU_ITEM}"]`));

const withDropdown = WrappedComponent => (props) => {
    const ref = useRef(null);
    const [ open, toggle ] = useState(false);

    const handleDocumentClick = (e) => {
        if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== 9))) {
            return;
        }

        const container = ref.current;
        if (container.contains(e.target)) {
            if (e.target.getAttribute('role') === ROLE_MENU_ITEM) {
                toggle(open => open ? !open : open);
            } else {
                const menuItems = getMenuItems(container);
                menuItems.map((menuItem) => {
                    if (menuItem.contains(e.target)) {
                        toggle(open => open ? !open : open);
                    }
                });
            }
        }

        if (container.contains(e.target) && container !== e.target
            && (e.type !== 'keyup' || e.which === 9)
        ) {
            return;
        }

        toggle(open => open ? !open : open);
    };

    const manageEvents = (remove = false) => {
        var eventUpdater = remove ? document.removeEventListener : document.addEventListener;
        events.forEach((event) => eventUpdater(event, handleDocumentClick, true));
    };

    useEffect(() => {
        manageEvents();
        return () => manageEvents(true);
    }, []);

    return (
        <WrappedComponent ref={ ref } toggle={ toggle } open={ open } { ...props } />
    );
};

export default withDropdown;
