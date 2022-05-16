
export const modalEvtBindings = (node) => {

    const handleKeydown = (e) => {
        e.stopPropagation();
        
        if(e.key === 'Escape'){
            node.dispatchEvent(new CustomEvent('esc', {
                detail: {}
            }));
        }
    }

    const handleTransitionEnd = (e) => {
        const node = e.target;
        
        node.focus();
    }

    node.addEventListener('transitionend', handleTransitionEnd);
    node.addEventListener('keydown', handleKeydown);
    node.focus();

    return {
        destroy: () => {
            node.removeEventListener('transitionend', handleTransitionEnd);
            node.removeEventListener('keydown', handleKeydown);
        }
    }
}
