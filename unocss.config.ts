import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  include: [
    // /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, /\.vue\?vue/, // .vue
    './unocss.config.ts',
  ],
  theme: {
    breakpoints: {
      'xs': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['box', 'rounded-lg border border-cyan-500 border-opacity-20'],
    ['btn', 'text-white text-opacity-70 text-center px-2 py-1 rounded bg-#21354e hover:bg-#273f5c'],
    ['btn--gradient', 'text-white bg-gradient-to-br from-#2084dd to-#1dbeda hover:bg-gradient-to-tl'],
    ['input', 'bg-transparent text-center outline-none text-xl font-700 w-full'],
  ],
  presets: [
    presetUno(),
    presetIcons({
      collections: {},
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
