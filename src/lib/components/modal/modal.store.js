
import { writable } from 'svelte/store'

export const modals = writable([]);

export function openModal(component, props, options){
    modals.update((prev) => [...(options?.replace ? prev.slice(0, prev.length - 1) : prev), { component, props }]);
}

export const closeModal = () =>  pop(1);
export const closeAllModals = () =>  modals.set([]);

function pop(amount = 1) {
    modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)));
}
