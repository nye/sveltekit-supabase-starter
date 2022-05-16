<script context="module">
    export const load = async ({session}) => {
        if(session?.user?.id){
            return {
                status: 301,
                redirect: '/'
            };
        }
        
        return {};
    }
</script>

<slot />
