import * as View from "./view"
import * as fabric from "fabric"

new View.CanvasView("main-canvas");

class Controller {

    private _canvasView: View.CanvasView;
    private _panel: View.PanelView;

    constructor() {
        var panelField = document.getElementById("panel-field");
        this._panel = new View.PanelView();
        this._panel.appendTo(panelField);
    }

}

new Controller();

