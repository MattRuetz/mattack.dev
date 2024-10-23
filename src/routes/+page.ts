// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load({ data }) {
    console.log('Page load function called');
    console.log('Page data:', data);
    return {
        ...data
    };
}