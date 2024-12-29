---
title: "Building a Mobile Nav Bar with the Dialog Element"
summary: "A step-by-step guide"
pubDate: "December 29, 2024"
type: "Development"
---

- I had been trying to make incremental updates to my website
- Came up with a new design and updated from Astro v1 to v5, so basically ended up rewriting the whole thing
- Something that had bothered me about the old website was the mobile nav never worked great
  - It didn't even use javascript, instead using a hidden checkbox trick to hide and show it
  ```html
  <label class="relative lg:hidden">
    <input class="peer hidden" type="checkbox" />
    <Icon name="ph:list" class="cursor-pointer" size="30" />
    <div
      class="absolute right-0 top-10 z-10 max-h-0 overflow-hidden rounded-lg bg-livid-700 text-center text-lg shadow-2xl transition-all duration-150 font-width-[87] peer-checked:max-h-96"
    >
      <a
        href="/reading"
        class="hover:bg-default-400/25 block px-10 py-4 transition-colors"
        >Reading</a
      >
      <a
        href="/blog"
        class="hover:bg-default-400/25 block px-10 py-4 transition-colors"
        >Blog</a
      >
      <a
        href="/about"
        class="hover:bg-default-400/25 block px-10 py-4 transition-colors"
        >About</a
      >
      <div class="hover:bg-default-400/25 cursor-pointer pb-2 pt-2">
        <a
          href="{Resume}"
          target="_blank"
          class="inline-block rounded-lg border px-4 py-3 tracking-wider transition-colors"
          >Resume</a
        >
      </div>
    </div>
  </label>
  ```
  - I didn't even block scrolling, so you could scroll it away
- In react projects, used to using something like Radix or HeadlessUI, wanted to see if there was something similar for vanillaJS
- Until I remembered that the dialog element now exists

- Need it to close when you click out of it
- I am designing mine only for mobile, but if you want it for desktop, then it should close if someone presses escape - this is supported by default on the dialog element
- This also means that it traps focus
- I also want it to not allow scrolling when it's open
- I also want it to close when you click somewhere outside of it
- Using `@astro-icon` for the icons

- Although I like tailwindCSS, doesn't support the dialog element yet
- It seems like there's some margin that we have to get rid of

```css
  /*   Open state of the dialog  */
  dialog[open] {
    opacity: 1;
    transform: translateX(0);
  }

  /*   Closed state of the dialog   */
  dialog {
    min-width: 100vw;
    min-height: 100vh;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s allow-discrete;
  }

  /*   Before-open state  */
  /* Needs to be after the previous dialog[open] rule to take effect,
    as the specificity is the same */
  @starting-style {
    dialog[open] {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  /* Transition the :backdrop when the dialog modal is promoted to the top layer */
  dialog::backdrop {
    background-color: rgb(25 35 41 / 0%);
    transition: all 0.3s allow-discrete;
  }

  dialog[open]::backdrop {
    background-color: rgb(25 35 41 / 30%);
  }

  /* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */
  @starting-style {
    dialog[open]::backdrop {
      background-color: rgb(25 35 41 / 0%);
    }
  }
```

# Making it work with Astro View Transitions

- I'm using Astro, so I'm using View Transitions
- I don't know how view transitions work outside of Astro (look into this)
- But if you navigate to a new page, clicking on the button to open the dialog will..., do nothing
- Need to wrap this so that it fires on every page load
```javascript
  document.addEventListener("astro:page-load", () => {
    const dialog = document.querySelector("dialog");

    // ... everything else that was in here previously

    closeButton!.addEventListener("click", () => {
      dialog!.close();
      document.body.style.overflow = "auto";
    });
  });
</script>
```

But then you'll see that if you click on a link, the transition won't be done, so we can fix that by adding this bit.
You might have to tweak the value depending on the length of your animation

```javascript
    document.addEventListener("astro:before-preparation", (event) => {
      const originalLoader = event.loader;
      event.loader = async function () {
        if (dialog.open) {
          dialog.close();
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        await originalLoader();
      };
    });
```
