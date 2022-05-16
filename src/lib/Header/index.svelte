<script>
    import { session, page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabaseClient';
    
    async function signOut(){
        await supabase.auth.signOut();
        goto('/login?loggedOut=true');
    }
</script>

<header>
    <nav>
        <ul>
            <li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
            <li class:active={$page.url.pathname === '/about'}><a sveltekit:prefetch href="/about">About</a></li>
            
            {#if $session.user?.id}
                <li class:active={$page.url.pathname === '/todos'}><a sveltekit:prefetch href="/todos">Todos</a></li>
                <li><a on:click|preventDefault={signOut} href="/logout">Logout</a></li>
            {:else}
                <li class:active={$page.url.pathname === '/signup'}><a sveltekit:prefetch href="/signup">Register</a></li>
                <li class:active={$page.url.pathname === '/login'}><a sveltekit:prefetch href="/login">Login</a></li>
            {/if}
        </ul>
    </nav>
</header>


<style lang="scss">
    header{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2rem;
        background: var(--grey-200);
    }
    
    nav{
        display: flex;
        justify-content: center;
    
        a{
            display: flex;
            height: 100%;
            align-items: center;
            padding: 0 1em;
            color: var(--color);
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: none;
            
            &:hover{
                color: var(--primary-color);
            }
        }
    }
    
    ul{
        position: relative;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
    }
    
    li{
        position: relative;
        height: 100%;
        
        &.active{
            a{
                color: var(--primary-color);
            }
        }
    }
</style>
