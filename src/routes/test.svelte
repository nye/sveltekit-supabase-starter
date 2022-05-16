<script>
    import { openModal } from "$lib/components/modal/modal.store.js";
    import { handleAlert } from "$lib/components/alert/alert.store.js";
    import DefaultModal from '$lib/components/modal/presets/DefaultModal.svelte'
    import Sidepanel from '$lib/components/modal/presets/Sidepanel.svelte'
    import Popover from "$lib/components/popover/Popover.svelte";

    function showModal(){
        openModal(DefaultModal, { title: "Alert", message: "The Modal content goes here..." })
    }
    
    function showModalSide(){
        openModal(Sidepanel, { title: "Alert", message: "The Sidepanel content goes here..." })
    }
    
    function handleShowAlert(){
        handleAlert({ type: "error", text: 'Test alert message!'});
    }
</script>


<svelte:head>
    <title>Test</title>
</svelte:head>

<section>
    <h1>Test</h1>
    
    <ol>
        <li><a href="/" on:click|preventDefault={showModal}>Modal</a></li>
        <li><a href="/" on:click|preventDefault={showModalSide}>Sidepanel</a></li>
        <li><Popover dir="left">
            <a slot="action" href="/" let:toggleVisibility on:click|preventDefault={toggleVisibility}>Popover</a>
            <ul class="popover__menu">
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
                <li>Option 4</li>
            </ul>
        </Popover></li>
        <li><a href="/" on:click|preventDefault={handleShowAlert}>Alert</a></li>
    </ol>
</section>


<style lang="scss">
    .popover__menu {
        list-style: none;
        background: var(--modal-background);
        box-shadow: var(--modal-shadow);
        border-radius: 7px;
        width: 160px;
        margin: 0;
        padding: 7px;
    }
</style>
