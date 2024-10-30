import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
    // Determine whether to show header based on the current route
    const showHeader = true; //url.pathname !== '/';
	const showFooter = true; //url.pathname !== '/';
    
    return {
        showHeader,
		showFooter
    };
};
