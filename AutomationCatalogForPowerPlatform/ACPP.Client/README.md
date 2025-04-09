### Setup
1. The app should be ready to be served by either hitting f5 or using the debugger window in VSCode.

### Using Localization 
1. Components should use `import { useTranslation } from "../../i18n";` to import the hook.
1. Every component should have its own json file. It should be placed in src/i18n/locales/en-US folder.
1. Use `const { t } = useTranslation('Common');` get the translator function.
   - Pass the name of the json file where the localized strings for this components are present.
   - If there are multiple json files, use `const { t } = useTranslation(['Common', 'AppContainer']);`
1. We can now use the translator function to get localized strings `<div>{t("welcome")}</div>`
   - If multiple json files are passed to the _useTranslation_ hook, the first file is considered as default.
   - To use the strings from second file, we should prefix the string with file name as shown `<p>{t("AppContainer:hello")}</p>`
   - The string names (keys) are case sensitive.
1. We can have nested json in the locale files and can be used in translator as shown `<div>{t("Header.title")}</div>`

_Note:_ <span style="background-color: #FFFF00; color:#000000">Auto refresh is not availble for changes made in loacales files. We need to manually refresh the page to see changes.</span>

_Note:_ During local development, the locale files are not copied to build folder or the virtual folder. We are using symlink in public\static folder to serve the files directly.