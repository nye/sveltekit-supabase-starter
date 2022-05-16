<script context="module">
    export const load = async ({session}) => {
        if(!session?.user?.id){
            return {
                status: 301,
                redirect: '/login'
            };
        }
    
        return {};
    }
</script>

<script>
    import { page } from '$app/stores';
</script>


{#if $page.url.searchParams.get('magic_link')}
    <span style="text-align: center;">Check your email for login link!</span>
{/if}

<slot/>
