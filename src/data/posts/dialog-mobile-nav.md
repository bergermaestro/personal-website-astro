---
title: "Building a Mobile Nav with <Dialog>"
summary: "A step-by-step guide"
pubDate: "December 29, 2024"
type: "Development"
---

As part of redesigning and reworking this website, I decided that the mobile nav bar needed some love. Despite the existing version being quirky and using a hidden checkbox to remain Javascript free, it was janky and didn't stop you from scrolling down the page when it was open, and didn't close when you clicked outside of it.

<details open>
<summary> <em>The existing mobile navbar. Not great, but it worked </em> </summary>

```html
<label class="relative lg:hidden">
  <input class="peer hidden" type="checkbox" />
  <Icon name="ph:list" class="cursor-pointer" size="30" />
  <div
    class="absolute right-0 top-10 z-10 max-h-0 overflow-hidden peer-checked:max-h-96"
  >
    <a href="/reading">Reading</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
  </div>
</label>
```

</details>

So I decided I needed a new mobile nav with the following features:

1. [ ] Close when you click outside of it
2. [x] Close when you press escape
3. [x] Trap focus
4. [ ] Prevent scrolling when it's open

When working on React projects, I would use something like Radix or HeadlessUI to get this functionality, and was going to look for similar libraries until I remembered the dialog element now exists, and it even handles requirements 2 and 3 for us automatically.

So, here's how to get a mobile nav bar working with the dialog element. The code snippets will be tailored to doing this in [Astro](https://astro.build), but the principles should be the same for any other framework.

# 1. Setup the HTML

I have a `Nav.astro` component that is used by the layout that gets applied on every page. This is where I put the dialog element. Since the element opens on the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), it doesn't matter where you put it in the DOM. I have used [`astro-icon`](https://www.astroicon.dev/) for the icons.

```html
<dialog class="h-screen w-screen bg-transparent">
  <div
    id="dialog-container"
    class="bg-slate-700 text-slate-300 ml-auto mr-0 h-full w-full max-w-56 p-4 pl-8"
  >
    <button autofocus class="float-right" id="closeButton">
      <Icon name="ph:x" size="30" />
    </button>
    <nav class="pt-16">
      <a href="/reading">Reading</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
    </nav>
  </div>
</dialog>
```

The key thing to note here is that we're using a separate `div` within the dialog to be the container with our content, and letting the `dialog` occupy the full screen. This is important for when we want to allow closing the dialog when we click outside of it.

# 2. Make it Interactive

If you're not using TypeScript, you can remove the type annotations and the `!`s that are after each of the `const` declarations at the top of the snippet.

```typescript
const dialog = document.querySelector("dialog")!;
const dialogContainer = document.querySelector("#dialog-container")!;
const showButton = document.querySelector("#showButton")!;
const closeButton = document.querySelector("#closeButton")!;

// Open the dialog when the button is clicked
showButton.addEventListener("click", () => {
  dialog.showModal();
  document.body.style.overflow = "hidden";
});

// Close the dialog when the close button is clicked
closeButton.addEventListener("click", () => {
  dialog.close();
  document.body.style.overflow = "auto";
});
```

Here, changing the `document.body.style.overflow` is what prevents the page from scrolling when the dialog is open. If you want to close the dialog when you click outside of it, you can add the following code:

```typescript
// Close on outside click
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Node &&
    !dialogContainer.contains(event.target) &&
    dialog.open &&
    !showButton.contains(event.target)
  ) {
    dialog.close();
    document.body.style.overflow = "auto";
  }
});
```

# 3. Style it

Although I like using TailwindCSS, it doesn't support the dialog element yet, which means that while the basic styling is included in Step 1, everything to make the dialog slide in and out will be done using plain CSS.

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

Despite the `dialog` starting with `display:none` then being set to `display:block` when we trigger our Javascript, the new `allow-discrete` property alongside `@starting-style` means that we can smoothly animate the dialog.

If you're not using Astro or you're not using View Transitions, congratulations &mdash; you're done! If you are, there's a few more small steps left.

# Making it work with Astro View Transitions

Despite seeming like everything is working fine, you'll notice that if you navigate to a new page, clicking on the button to open the dialog will do nothing. This is because the client-side navigation introduced by the View Transitions means our script isn't being run after the initial page load. To fix this, we can wrap our script in an event listener that fires on every page load.

```typescript
document.addEventListener("astro:page-load", () => {
  const dialog = document.querySelector("dialog");
  // …everything else that was in here previously
});
```

Also, when I was implementing this myself, I noticed that when you clicked a link, the transition between pages would fire before sliding the dialog out, leading to a slightly jarring animation. To fix this, we can delay the page switching until our animation is finished by adding the following code within the `astro:page-load` event listener.

```typescript
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

You might have to tweak the length of the `setTimeout` depending on the length of your animation.

And that's it, you're all done! To see my full implementation, you can check out the [source code](https://github.com/bergermaestro/personal-website-astro/blob/3ce06d321d04111c66b8d0dfe6dd64d1a6a92560/src/components/Nav.astro).
