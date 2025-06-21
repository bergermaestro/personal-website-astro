declare module "masonry-layout" {
  export default class Masonry {
    constructor(element: Element | string, options?: any);
    layout(): void;
    destroy(): void;
    reloadItems(): void;
  }
}
