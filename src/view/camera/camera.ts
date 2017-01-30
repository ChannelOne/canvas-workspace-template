import {Point} from "../../model"

export class Camera {

    private _position: Point;
    private _scale: number;

    constructor() {
        this._position =  {
            x: 0, y: 0
        };

        this._scale = 1;
    }

    reset() {
        this._position = {x:0, y:0};
        this._scale = 1;
    }

    getTransformMatrix() : Array<number> {
        return [this._scale, 0, 0, this._scale, this._position.x, this._position.y];
    }

    get position() {
        return this._position;
    }

    set position(pos: Point) {
        this._position = pos;
    }

}
