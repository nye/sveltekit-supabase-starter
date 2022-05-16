<script>
    import { navigating } from '$app/stores';
    import { supabase } from '$lib/supabaseClient';
    import { session } from '$app/stores';
    import { setAuthCookie, unsetAuthCookie } from '$lib/utils/session';
    
    import Header from '$lib/Header/index.svelte';
    import PageNavIndicator from "$lib/components/PageNavIndicator.svelte";
    import ModalBackdrop from "$lib/components/modal/ModalBackdrop.svelte";
    import AlertList from "$lib/components/alert/AlertList.svelte";
    
    supabase.auth.onAuthStateChange(async (event, _session) => {
        /*
        Aquest opció contempla també l'event TOKEN_REFRESHED, pero dona un error raro...
        
        if(event !== 'SIGNED_OUT'){
            session.set({user: _session.user});
            await setAuthCookie(_session);
        }else{
            session.set({user: {guest: true}});
            await unsetAuthCookie();
        }
        */
        if(event === 'SIGNED_IN'){
            session.set({user: _session.user});
            await setAuthCookie(_session);
        }else if(event === 'SIGNED_OUT'){
            session.set({user: {guest: true}});
            await unsetAuthCookie();
        }
    });

    session.subscribe((value) => {
        // Si trec aquest subscribe, dona errors fatals al fer login/logout
        // TODO: Hauria d'investigar millor tot això...
    });
</script>


{#if $navigating}
    <PageNavIndicator />
{/if}

<Header/>

<main>
    <AlertList/>
    
    <slot/>
</main>

<ModalBackdrop/>


<style lang="scss" global>
    @import '../scss/global.scss';

    main{
        width: 100%;
        height: 100%;
        max-height: 100vh;
        overflow-x: hidden;
        padding: 2rem;
    }
</style>
