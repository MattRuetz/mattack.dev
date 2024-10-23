import type { PageServerLoad } from './$types';
import { getRandomEmphColor } from './randomemphcolor';

export const load: PageServerLoad = () => {
    console.log('Page server load function called');
    return {
        cardColors: {
            first: getRandomEmphColor(),
            second: getRandomEmphColor(),
            third: getRandomEmphColor()
        }
    };
};
