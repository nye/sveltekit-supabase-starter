<script>
    import Modal from '../Modal.svelte';

    // These are forward params, just pass it on to the parent modal
    export let isOpen; // open behavior
    export let index = 0; // unique ids for accessibility

    export let title = '';
    export let message = '';
</script>


<Modal isOpen={isOpen} {index} isSidePanel={true}>
    {#if title}
        <h1 class="modal__content-title" id={`modal__content-title-${index}`}>{title}</h1>
    {/if}
    <p class="modal__content-body" id={`modal__content-body-${index}`}>{@html message}</p>
    <div class="modal__actions" slot="actions" let:dismiss>
        <button on:click={dismiss}>close</button>
    </div>
</Modal>


<style lang="scss">
    .modal__content-title {
        position: relative;
        top: -8px;
        font-size: 2rem;
        font-weight: bold;
        text-align: right;
        pointer-events: none;
    }
    
    .modal__content-body {
    
    }
</style>
