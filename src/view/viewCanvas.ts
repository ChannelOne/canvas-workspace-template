import {DomHelper} from "../util"
import {Camera} from "./camera"
import * as fabric from "fabric"

var counter = 0;

interface Point {
    x: number,
    y: number,
}

export class CanvasView extends DomHelper.FixedElement {

    private _camera: Camera;
    private _canvasElemId: string;
    private _canvasElem: HTMLCanvasElement;
    private _fabricCanvas: fabric.Canvas;
    private _center: Point;
    private _transformMatrix: number[];

    private _mouseStartPos: Point = null;
    private _startCameraPos: Point = null;

    constructor(painterId: string, classStr: string = "") {
        super("div", classStr);

        let winWidth = window.innerWidth,
            winHeight = window.innerHeight;

        this._camera = new Camera();

        this._center = {
            x: winWidth / 2,
            y: winHeight / 2,
        };

        this._canvasElemId = painterId + "_" + counter++;
        this._canvasElem = DomHelper.Generic.elem<HTMLCanvasElement>("canvas");
        this._canvasElem.setAttribute("id", this._canvasElemId);
        this._canvasElem.width = winWidth;
        this._canvasElem.height = winHeight;

        var parent = document.getElementById(painterId);
        parent.appendChild(this._canvasElem);

        parent.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        parent.addEventListener("mousedown", (e: MouseEvent) => {
            this.handleMouseDown(e);
        })

        parent.addEventListener("mouseup", (e: MouseEvent) => {
            this.handleMouseUp(e);
        })

        parent.addEventListener("mousemove", (e: MouseEvent) => {
            this.handleMouseMove(e);
        })

        this._fabricCanvas = new fabric.Canvas(this._canvasElemId, {
            selection: false
        });

        this.drawBackground();
    }

    private handleMouseDown(e: MouseEvent) {
        if (e.which === 3) {
            e.preventDefault();

            this._mouseStartPos = {
                x: e.screenX,
                y: e.screenY,
            };

            this._startCameraPos = {
                x: this._camera.position.x,
                y: this._camera.position.y,
            };
        }
    }

    private handleMouseUp(e: MouseEvent) {
        if (e.which === 3) {
            e.preventDefault();
            this._mouseStartPos = null;
            this._fabricCanvas.viewportTransform = this._camera.getTransformMatrix();
        }
    }

    private handleMouseMove(e: MouseEvent) {
        if (this._mouseStartPos !== null) {
            var vector: Point = {
                x: e.screenX - this._mouseStartPos.x,
                y: e.screenY - this._mouseStartPos.y,
            }

            this._camera.position = {
                x: this._startCameraPos.x + vector.x,
                y: this._startCameraPos.y + vector.y,
            };

            this._fabricCanvas.viewportTransform = this._camera.getTransformMatrix();
            this._fabricCanvas.renderAll();
        }
    }

    private drawBackground() {
        let centerCircle = new fabric.Circle({
            left: this._center.x,
            top: this._center.y,
            radius: 16,
            fill: "red",
            evented: false,
            hasControls: false,
            hasBorders: false,
        });

        this._fabricCanvas.add(centerCircle);
    }

    get transformMatrix() {
        return this._transformMatrix;
    }

    set transformMatrix(v: number[]) {
        this._transformMatrix = v;

        this._fabricCanvas.viewportTransform = v;
        this._fabricCanvas.renderAll();
    }

}
