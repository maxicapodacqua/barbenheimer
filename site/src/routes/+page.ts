import type { PageLoad } from './$types';

export const ssr = false;


export const load: PageLoad = async ({ fetch, params, depends }) => {
    const resp = await fetch('http://localhost:3000/scoring');
    const scoring = await resp.json();
    depends('app:scoring');
    return {
        'scoring': scoring,
    };
};