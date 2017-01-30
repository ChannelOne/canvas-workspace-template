import {SubPanel} from "."
import {DomHelper} from "../util"

export enum ToolboxItemOption {
    Rectangle, Circle
}

export class ToolboxItemClickEvent extends Event {

    private _option: ToolboxItemOption;

    constructor(option: ToolboxItemOption) {
        super("toolboxItemClick");

        this._option = option;
    }

    get option() {
        return this._option;
    }

}

export class ToolboxPanel extends DomHelper.AppendableDomWrapper implements SubPanel {

    private _container: HTMLDivElement;
    private _items: ToolboxItem[];

    constructor() {
        super("div", "toolbox-panel");

        this._container = DomHelper.Generic.elem<HTMLDivElement>("div");
        this._items = [];

        let rec = new RectangleToolboxItem();
        this.addItem(rec);
    }

    addItem(item: ToolboxItem) {
        this._items.push(item);
        this._dom.appendChild(item.element());
    }

    initialize() {

    }

    pause() {

    }

    continue() {

    }

    destroy() {

    }

}

export abstract class ToolboxItem extends DomHelper.AppendableDomWrapper {

    constructor() {
        super("div", "toolbox-item");
    }

    abstract getName(): string;
    abstract getDescription(): string;
    abstract getLogoUrl(): string;

}

export class RectangleToolboxItem extends ToolboxItem {

    constructor() {
        super();

        this._dom.addEventListener("click", (e: MouseEvent) => {
            this.handleClick(e);
        })
    }

    private handleClick(e: MouseEvent) {
        let evt = new ToolboxItemClickEvent(ToolboxItemOption.Rectangle);
        this._dom.dispatchEvent(evt);
    }

    getName() {
        return "Rectangle";
    }

    getDescription() {
        return ""
    }

    getLogoUrl() {
        return null;
    }

}
