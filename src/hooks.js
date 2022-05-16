import { auth, supabase } from '$lib/supabaseClient';
import { serialize, parse } from 'cookie'

const COOKIE_NAME = 'sb:token'
const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24 * 7,
    domain: '',
    path: '/',
    sameSite: 'lax',
    httpOnly: true
}

export const handle = async ({event, resolve}) => {
    const sbToken = event.request.headers.get('Cookie') ? parse(event.request.headers.get('Cookie'))[COOKIE_NAME] : ''
    
    if(sbToken){
        const {user, error} = await auth.api.getUser(sbToken)
        
        if(error){
            event.locals.user = {guest: true}
        }
        
        event.locals.user = user
    }else{
        event.locals.user = {guest: true}
    }
    
    let response = await resolve(event);
    
    if(event.request.method === 'POST' && new URL(event.request.url).pathname === '/api/auth.json'){
        const req = JSON.parse(await event.request.text())
        
        if(req.event === 'SIGNED_IN'){
            const cookieHeader = await serialize(COOKIE_NAME, req.session.access_token, {
                ...COOKIE_OPTIONS,
                expires: new Date(req.session.expires_at),
                maxAge: req.session.expires_in
            })
            
            await auth.setAuth(req.session.access_token)
            response.headers.append('Set-Cookie', cookieHeader)
        }else if(req.event === 'SIGNED_OUT'){
            const cookieHeader = await serialize(COOKIE_NAME, 'deleted', {...COOKIE_OPTIONS, maxAge: 0})
            
            await auth.api.signOut(sbToken)
            response.headers.append('Set-Cookie', cookieHeader)
        }
        
        return response
    }
    
    return response
};

export async function getSession(event){
    const {user, token} = event.locals;
    
    return {
        user,
        token
    };
}
