import {redirect} from "@/i18n/routing";

export const dynamic = 'force-static'

export const GET = async (request) => {
    return redirect('/en');
}