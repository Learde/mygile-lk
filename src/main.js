import "./assets/main.css";
import "vuestic-ui/css";

import { createVuestic } from "vuestic-ui";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createVuestic({
    config: {
        colors: {
            presets: {
                light: {
                    primary: '#59189A',
                },
                dark: {
                    primary: '#9d4edd',
                }
            }
        }
    },
}));
app.use(createPinia());
app.use(router);

app.mount("#app");
