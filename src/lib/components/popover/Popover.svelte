<script>
    import { scale } from 'svelte/transition';
    import { popoverBindings } from './popover.action';

    export let dir = 'right';
    
    let show = false;
    
    const toggleVisibility = () => show = !show;
</script>


<div class="popover" tabindex="-1" use:popoverBindings on:out={() => { if(show) show = false }} on:esc={toggleVisibility}>
    <slot name="action" {toggleVisibility} />
    {#if show}
        <div class="popover__content" class:popover__content--left={dir === 'left'} class:popover__content--right={dir === 'right'}
            in:scale={{ duration: 75, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }}>
            <slot/>
        </div>
    {/if}
</div>

<style lang="scss">
    .popover {
        position: relative;
    }
    .popover__content {
        position: absolute;
        z-index: 20;
    }
    .popover__content--right {
        right: 0;
        //@apply right-0 origin-top-right
    }
    .popover__content--left {
        left: 0;
        //@apply left-0 origin-top-left
    }
</style>
