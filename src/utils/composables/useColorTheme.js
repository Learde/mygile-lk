import { useColorMode } from "@vueuse/core";
import { useColors } from "vuestic-ui";

export const useColorTheme = function () {
    const { applyPreset } = useColors();
    const colorMode = useColorMode();

    function setTheme(theme) {
        colorMode.value = theme;
        applyPreset(theme);
    }

    function applyTheme() {
        applyPreset(colorMode.value);
    }

    return { colorMode, setTheme, applyTheme };
};
