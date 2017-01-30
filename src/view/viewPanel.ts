import * as fabric from "fabric"
import {ToolboxPanel} from "./viewToolboxPanel"
import {DomHelper} from "../util"

export class PanelView extends DomHelper.FixedElement {

    protected _container: HTMLDivElement;
    protected _subpanels: SubPanel[]

    constructor() {
        super("div");

        this.left = 0;
        this.top = 0;
        this.width = 230;

        this.height = window.innerHeight;
        window.addEventListener("resize", (e) => {
            this.height = window.innerHeight;
        })

        this._container = DomHelper.Generic.elem<HTMLDivElement>("div");
        this._dom.appendChild(this._container);

        this._subpanels = [];
    }

    addPanel(subPanel: SubPanel) {
        this._subpanels.push(subPanel);

        subPanel.appendTo(this._container);
    }

}

export interface SubPanel extends DomHelper.IDOMWrapper {

    initialize(); // call when SubPanel added to element

    pause(); // call when this SubPanel is going to hide
    continue(); // call when this SubPanel is going to present

    destroy(); // call when this SubPanel is going to be be removed

    getLogoUrl?: () => string;

}
