<script>
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabaseClient';
    import { page } from '$app/stores';
    import SocialLogin from '$lib/SocialLogin/index.svelte';
    
    let loading = false;
    
    let email;
    let password;
    
    async function loginUser(){
        loading = true;
        
        let {error} = await supabase.auth.signIn({email, password});
        
        if(error){
            loading = false;
            alert(error);
            
            return;
        }
        
        let redirect = $page.url.searchParams.get('redirect') || '/';
        
        if(!password) redirect = `${redirect}?magic_link=true`;
        goto(redirect);
    }
</script>


<svelte:head>
    <title>Login</title>
</svelte:head>

<section>
    <h1>Login</h1>
    
    <SocialLogin/>
    
    <form on:submit|preventDefault={loginUser}>
        <div>
            <input type="email"
                   id="email"
                   autocomplete="email"
                   placeholder="Email"
                   required
                   bind:value={email}/>
        </div>
        <div>
            <input type="password"
                   id="password"
                   placeholder="Password (optional)"
                   bind:value={password}/>
        </div>
        <div>
            <button type="submit" class="submit" disabled={loading}>{loading ? 'Loading ...' : 'Log In'}</button>
        </div>
        
        <div>
            <a sveltekit:prefetch href="/signup">No account? Register here</a>
        </div>
    </form>
</section>


<style lang="scss">

</style>
