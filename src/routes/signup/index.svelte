<script>
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabaseClient';
    import { page } from '$app/stores';
    import SocialLogin from '$lib/SocialLogin/index.svelte';
    
    let loading = false;
    
    let email;
    let password;
    
    async function registerUser(){
        loading = true;
        
        // if session is null user needs to confirm their email address
        let {user, error, session} = await supabase.auth.signUp({email, password});
        
        if(error){
            alert(error);
            
            return;
        }
        
        userStore.set({user});
        
        let redirect = $page.query.get('redirect') || '/';
        
        goto(redirect);
    }
</script>


<svelte:head>
    <title>Register</title>
</svelte:head>

<section>
    <h1>Register</h1>
    
    <SocialLogin/>
    
    <form on:submit|preventDefault={registerUser}>
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
                   placeholder="Password"
                   required
                   bind:value={password}/>
        </div>
        
        <div>
            <button type="submit" class="submit" disabled={loading}>{loading ? 'Loading ...' : 'Register'}</button>
        </div>
    </form>
</section>


<style lang="scss">

</style>
