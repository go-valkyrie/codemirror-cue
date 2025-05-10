import {resolve} from 'node:path';
import {lezer} from '@lezer/generator/rollup';
import typescript from 'rollup-plugin-typescript2';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts'
import {ModuleFormat} from "node:module";

export default defineConfig({

    build: {
        minify: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: (format, entryName): string => {
                return `${entryName}.js`
            }
        },
        rollupOptions: {
            external: [
                '@codemirror/autocomplete',
                '@codemirror/language',
                '@lezer/lr'
            ],
        }
    },
    plugins: [
        typescript({
            check: true,
            useTsconfigDeclarationDir: true,
        }),
        lezer(),
        dts({
            rollupTypes: true,
        })
    ]
})