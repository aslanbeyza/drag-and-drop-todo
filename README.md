
![Ekran görüntüsü 2024-06-24 155401](https://github.com/BEYZAASLAN/drag-and-drop-todo/assets/118660685/c87ef215-f6e0-47ff-8112-095f15f71c30)
![Ekran görüntüsü 2024-06-24 155350](https://github.com/BEYZAASLAN/drag-and-drop-todo/assets/118660685/c4955975-6d94-489e-a9a3-81a53071c025)
![Ekran görüntüsü 2024-06-24 155302](https://github.com/BEYZAASLAN/drag-and-drop-todo/assets/118660685/fb1b53f9-77dc-4fff-9f0e-afde247545b8)




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
