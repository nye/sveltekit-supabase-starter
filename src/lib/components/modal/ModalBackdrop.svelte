<script>
    import ModalStack from './ModalStack.svelte';
    import { closeModal } from './modal.store';
</script>


<ModalStack>
    <div slot="backdrop" class="modal__backdrop" on:click={closeModal}></div>
</ModalStack>


<style lang="scss">
    .modal__backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: .5;
        background: var(--grey-500);
        z-index: 10000;
    }
</style>
