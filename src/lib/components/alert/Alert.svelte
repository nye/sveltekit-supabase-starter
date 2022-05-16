<script>
    import { fly } from 'svelte/transition';
    import { clearAlertTimeout } from './alert.store';

    export let alert;
    export let isVisible = true;
</script>


{#if isVisible}
    <aside
        class="alert"
        class:alert--success={alert.type === 'success'}
        class:alert--error={alert.type === 'error'}
        transition:fly={{y: 100}}>
        <div class="alert__content">
            {#if alert.type === 'success'}
                Check Icon
            {:else}
                Alert circle icon
            {/if}
            <p>
                {@html alert.text}
            </p>
            <button class="alert__action-close" on:click={() => (isVisible = !isVisible)} on:click={() => clearTimeout(clearAlertTimeout())}>&times;</button>
        </div>
    </aside>
{/if}


<style lang="scss">
    .alert {
    //@apply block shadow-md rounded px-3 py-2 transition-all mt-2 bg-gray-100 text-gray-800
    }
    .alert__content {
    //@apply flex gap-2
    }
    .alert__content p {
    //@apply max-w-xs break-words text-base
    }
    .alert--success {
    //@apply bg-green-300 text-gray-800
    }
    .alert--error {
    //@apply bg-red-500 text-white
    }
    .alert__action-close {
    //@apply inline-grid place-content-center rounded-full w-5 h-5 border-0 m-0 p-0 transition-colors
    }
    .alert__action-close:hover {
    //@apply text-gray-200 bg-gray-500
    }
    .alert--success .alert__action-close {
    //@apply text-gray-400 bg-green-200
    }
    .alert--success .alert__action-close:hover {
    //@apply bg-green-700 text-white
    }
    .alert--error .alert__action-close {
    //@apply text-gray-300 bg-red-600
    }
    .alert--error .alert__action-close:hover {
    //@apply text-red-600 bg-red-300
    }
</style>
