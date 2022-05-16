<script context="module">
    export function load({ error, status }) {
        return {
            props: {
                error,
                status
            }
        };
    }
</script>

<script>
    import { navigating } from '$app/stores';
    import { dev } from '$app/env';
    import Header from '$lib/Header/index.svelte';
    import PageNavIndicator from "$lib/components/PageNavIndicator.svelte";
    import ModalBackdrop from "$lib/components/modal/ModalBackdrop.svelte";
    import AlertList from "$lib/components/alert/AlertList.svelte";
    
    export let error, status;
</script>


<svelte:head>
    <title>{status}</title>
</svelte:head>


{#if $navigating}
    <PageNavIndicator />
{/if}

<Header/>

<main>
    <AlertList/>
    <div class="error-page">
        <h1>{status}</h1>
        
        <p>{error.message}</p>
        
        {#if dev && error.stack}
            <pre>{error.stack}</pre>
        {/if}
    </div>
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

    .error-page{
        padding: 4rem;
    }
</style>
