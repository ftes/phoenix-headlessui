import { defineCustomElement, computed, ref, h, Fragment } from "vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/vue"

// https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue
// No option to force light dom instead of shadow dom: https://github.com/vuejs/core/issues/4314
export default defineCustomElement({
  // normal Vue component options here
  props: {
    value: String,
    options: String,
    id: String,
  },
  emits: {},
  setup(props) {
    const cssHref = document.getElementById("phoenix-css").href

    const onInput = (...args) => {
      console.log("input", args)
      const rootEl = document.getElementById(props.id)
      const target = rootEl.attributes["phx-target"]?.value
      function onReply() {}
      rootEl.__view.pushHookEvent(target, "select", { value }, onReply)
    }

    const query = ref('')
    const filteredOptions = computed(() => {
      const options = JSON.parse(props.options)

      return query.value === ''
        ? options
        : options.filter((option) => {
            return option.label.toLowerCase().includes(query.value.toLowerCase())
          })
    })

    return ({ value }) => (
      <>
        <link rel="stylesheet" href={cssHref} />
          <Combobox as="div" onInput={onInput} value={value}>
          <div class="relative mt-1">
            <ComboboxInput class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" onChange={e => { query.value = e.target.value }} display-value={(option) => option?.label} />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            {filteredOptions.length > 0 && (
              <ComboboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="option in filteredOptions" key={option.username} value={option} as="template"> {/* v-slot="{ active, selected }" */}
                  <li class={['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']}>
                    <div class="flex">
                      <span class={['truncate', selected && 'font-semibold']}>
                        {option.label}
                      </span>
                      <span class={['ml-2 truncate text-gray-500', active ? 'text-indigo-200' : 'text-gray-500']}>
                        {option.username}
                      </span>
                    </div>

                    {selected && (
                      <span class={['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']}>
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </>
    )
  },

  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/* inlined css */`]
})
