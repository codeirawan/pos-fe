<p align="center">
<img src="https://user-images.githubusercontent.com/11247099/140462375-7b7ac4db-35b7-453c-8a05-13d8d20282c4.png" width="600"/>
</p>

<h2 align="center">
<a href="https://github.com/antfu/vitesse">Vitesse</a> for Nuxt 3
</h2><br>

<pre align="center">
🧪 Working in Progress
</pre>

<p align="center">
<br>
<a href="https://vitesse-nuxt3.netlify.app/">🖥 Online Preview</a>
<br><br>
<a href="https://stackblitz.com/github/antfu/vitesse-nuxt3"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## Features

- [💚 Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.

- ⚡️ Vite - Instant HMR.

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

- 😃 Use icons from any icon sets in Pure CSS, powered by [UnoCSS](https://github.com/antfu/unocss).

- 🔥 The `<script setup>` syntax.

- 🍍 [State Management via Pinia](https://pinia.esm.dev), see [./composables/user.ts](./composables/user.ts).

- 📑 [Layout system](./layouts).

- 📥 APIs auto importing - for Composition API, VueUse and custom composables.

- 🏎 Zero-config cloud functions and deploy.

- 🦾 TypeScript, of course.

- 📲 [PWA](https://github.com/vite-pwa/nuxt) with offline support and auto update behavior.


## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [ColorMode](https://github.com/nuxt-community/color-mode-module) - dark and Light mode with auto detection made easy with Nuxt.
- [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine.
- [Pinia](https://pinia.esm.dev/) - intuitive, type safe, light and flexible Store for Vue.
- [VitePWA](https://github.com/vite-pwa/nuxt) - zero-config PWA Plugin for Nuxt 3.

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable Vetur if you have it).

## Variations

- [vitesse](https://github.com/antfu/vitesse) - Opinionated Vite Starter Template
- [vitesse-lite](https://github.com/antfu/vitesse-lite) - Lightweight version of Vitesse
- [vitesse-nuxt-bridge](https://github.com/antfu/vitesse-nuxt-bridge) - Vitesse for Nuxt 2 with Bridge
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - WebExtension Vite starter template

## Try it now!

### Online

<a href="https://stackblitz.com/github/antfu/vitesse-nuxt3"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/antfu/vitesse-nuxt3/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit antfu/vitesse-nuxt3 my-nuxt3-app
cd my-nuxt3-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

<!-- Work In Progress -->

### Commits

Semantic Commit Messages
See how a minor change to your commit message style can make you a better programmer.

Format: <type>(<scope>): <subject>

<scope> is optional

Example
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
More Examples:

feat: (new feature for the user, not a new feature for build script)
fix: (bug fix for the user, not a fix to a build script)
docs: (changes to the documentation)
style: (formatting, missing semi colons, etc; no production code change)
refactor: (refactoring production code, eg. renaming a variable)
test: (adding missing tests, refactoring tests; no production code change)
chore: (updating grunt tasks etc; no production code change)
References:

https://www.conventionalcommits.org/
https://seesparkbox.com/foundry/semantic_commit_messages
http://karma-runner.github.io/1.0/dev/git-commit-msg.html


## ADD OFFLINE

1. Add file Interface in *interfaces*
   ```typescript
        export default interface InterfaceName {
        id: number,
        text: string
        }
   ```
2. Edit *plugins/db.ts*
    ```typescript
        import type InterfaceName from '~/interfaces/InterfaceName'
        export class DB extends Dexie {
            ...
            table_name!: Table<InterfaceName>

            constructor() {
                super('myDatabase')
                this.version(1).stores({
                    ....
                    table_name: 'id, text'
                })
            }
            }
    ```
3. add utils files to call api and save data to indexdb *utils* path 
    ```typescript
    import type { IAPIResponse } from 'interfaces/IAPI'

    export default function (store_id: number) {
        return new Promise((resolve, reject) => {
            const { $dexie, $getLastDBindex, $fetcher } = useNuxtApp()
            $getLastDBindex('table_name', 'store_id', store_id).then((last: string) => {
                url = 'api_name'
                if (last)
                    url += `?last_date=${last}`
                $fetcher({ url }).then((res: IAPIResponse) => {
                    const { success, data } = res
                    if (success) {
                        //$dexie.table_name.bulPut
                        $dexie.table('table_name').bulkPut(data.data).then((last_key: any) => {
                            resolve({ success, last_key })
                            }).catch((e: any) => {
                                reject(e)
                            })
                        }
                    else {
                        reject(new Error(`${JSON.stringify(res)}`))
                    }
                })
            })
        })
    }

    ```
4. Add to autoimport goto *layout/default.vue*
    ```typescript
        ...
        window.setInterval(async () => {
            const time_sinc = store.timeSync
            const id_store = store.idStore
            if (time_sinc > 0) {
                ...
                await useUtilsName()
            }
            time_run++
        }, 60000)
    ```

### HOW TO USE?
1. Use tabel just use component *DataTableIndexdb* 
    ```vue
    <forms-data-table-indexdb title="title" :columns="coloumn_of_table" module="tablename" :params="{ params: params }" :uri-detail="url_if_click_detail" />
    ```

2. call from script
   you can read from [https://dexie.org/docs/Tutorial/Vue](dexie) official documentation  
    ```vue
    <script setup lang="ts">
    const { $dexie } = useNuxtApp()
    const data = await $dexie.table_name.toArray()
    // or
    const data = await $dexie.Table('table_name').toArray()
    // or
    $dexie.Table('table_name').toArray().then((data) => {
      console.log(data)
    })
    </script>
    ```