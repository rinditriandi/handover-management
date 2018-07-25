<template>
    <div>
        <v-container grid-list-md fluid>
            <v-layout>
                <v-flex xs12 sm4 offset-sm4>
                    <v-card>
                        <v-card-media class="white--text" height="400px" src="http://localhost:8083/public/img/404/404-1.gif"></v-card-media>
                        <v-card-title>
                            <div>
                                <span>Please press button on the bottom. If the button can not work, please close current tab manually ..</span><br>
                                <span>Have a nice day ..</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat color="success" @click="closeWindow()">Close Current Tab</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    beforeMount() {

    },
    created() {

    },
    methods: {
        closeWindow() {
            window.close();
        }
    }
}
</script>

<style>

</style>
