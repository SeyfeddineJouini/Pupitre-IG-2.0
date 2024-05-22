import React, { useEffect } from 'react';

const LockPage = () => {
    useEffect(() => {
        // Disable right click
        const disableContextMenu = event => event.preventDefault();
        document.addEventListener('contextmenu', disableContextMenu);

        // Prevent closing page
        const preventClose = event => {
            event.preventDefault();
            event.returnValue = '';
        };
        window.addEventListener('beforeunload', preventClose);

        // Intercept clicks on links
        const interceptLinkClicks = event => {
            const target = event.target.closest('a');
            if (target && target.getAttribute('target') === '_blank') {
                event.preventDefault();
                // Optionally, you can redirect the link to the same tab if needed
                window.location.href = target.href;
            }
        };
        document.addEventListener('click', interceptLinkClicks);

        return () => {
            document.removeEventListener('contextmenu', disableContextMenu);
            window.removeEventListener('beforeunload', preventClose);
            document.removeEventListener('click', interceptLinkClicks);
        };
    }, []);

    return null;
};

export default LockPage;
