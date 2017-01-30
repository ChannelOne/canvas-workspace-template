import {DomHelper} from "../util"
import {Camera} from "./camera"
import * as fabric from "fabric"

var counter = 0;

interface Point {
    x: number,
    y: number,
}

export class CanvasView extends DomHelper.FixedElement {

    private _parent: HTMLElement;

    private _camera: Camera;
    private _canvasElemId: string;
    private _canvasElem: HTMLCanvasElement;
    private _fabricCanvas: fabric.Canvas;
    private _center: Point;
    private _transformMatrix: number[];

    private _mouseStartPos: Point = null;
    private _startCameraPos: Point = null;

    private _viewportSize: Point;

    constructor(painterId: string, classStr: string = "") {
        super("div", classStr);

        let winWidth = window.innerWidth,
            winHeight = window.innerHeight;

        this._viewportSize = {
            x: winWidth,
            y: winHeight,
        };

        this._camera = new Camera();

        this._center = {
            x: 0,
            y: 0,
        };

        this._canvasElemId = painterId + "_" + counter++;
        this._canvasElem = DomHelper.Generic.elem<HTMLCanvasElement>("canvas");
        this._canvasElem.setAttribute("id", this._canvasElemId);
        this._canvasElem.width = winWidth;
        this._canvasElem.height = winHeight;

        this._parent = document.getElementById(painterId);
        this._parent.appendChild(this._canvasElem);

        document.getElementById("test-scroll").addEventListener("scroll", (e) => {
            this.handleScroll(e);
        })

        window.addEventListener("scroll", (e) => {
            this.handleScroll(e);
        })

        this._parent.addEventListener("click", (e) => {
            this.handleClick(e);
        })

        this._parent.addEventListener("scroll", (e) => {
            this.handleScroll(e);
        })

        this._parent.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        this._parent.addEventListener("mousedown", (e: MouseEvent) => {
            this.handleMouseDown(e);
        })

        this._parent.addEventListener("mouseup", (e: MouseEvent) => {
            this.handleMouseUp(e);
        })

        this._parent.addEventListener("mousemove", (e: MouseEvent) => {
            this.handleMouseMove(e);
        })

        this._fabricCanvas = new fabric.Canvas(this._canvasElemId, {
            selection: false
        });

        this.drawBackground();
    }

    render() {
        var matrix = this._camera.getTransformMatrix().slice();

        matrix[4] += this._viewportSize.x / 2;
        matrix[5] += this._viewportSize.y / 2;

        this._fabricCanvas.viewportTransform = matrix;
        this._fabricCanvas.renderAll();
    }

    private handleScroll(e: Event) {
        var height = window.scrollY;
        this._camera.scale = height * 0.0005 + 1;

        this.render();
    }

    private handleClick(e: MouseEvent) {
        var newRect = new fabric.Rect({
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            fill: "blue"
        });

        this._fabricCanvas.add(newRect);
    }

    private handleMouseDown(e: MouseEvent) {
        // left button
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
        // left button
        if (e.which === 3) {
            e.preventDefault();
            this._mouseStartPos = null;

            // this.render();
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

            this.render();
        }
    }

    private drawBackground() {
        let centerCircle = new fabric.Circle({
            left: this._center.x - 8,
            top: this._center.y - 8,
            radius: 16,
            fill: "red",
            evented: false,
            hasControls: false,
            hasBorders: false,
        });

        this._fabricCanvas.add(centerCircle);
        this.render();
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
