<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { building } from "$app/environment";

  let { data } = $props();
  const { posts } = data;

  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const debounceSearch = debounce(handleChange, 400);

  function handleChange(evt) {
    const inputEl = evt.target;

    const newSearchParams = !building
      ? page.url.searchParams
      : new URLSearchParams();

    if (inputEl.value != "") {
      newSearchParams.set("q", inputEl.value);
    } else {
      newSearchParams.delete("q");
    }

    goto(`?${newSearchParams}`, { keepFocus: true });
  }

  // let items = ["One", "Two", "Three"];
  let value = $state(!building ? page.url.searchParams.get("q") || "" : "");
  let filteredItems = $derived(
    value
      ? posts.filter((item) =>
          item.title.rendered.toLowerCase().includes(value.toLowerCase()),
        )
      : posts,
  );
</script>

<input type="text" onkeyup={debounceSearch} placeholder="Search" bind:value />

{#each filteredItems as item}
  <p>{@html item.title.rendered}</p>
{/each}
