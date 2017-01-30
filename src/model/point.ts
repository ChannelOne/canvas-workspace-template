
export interface Point {
    x: number,
    y: number,
}

export namespace PointHelper {

    export function PointClone(a: Point): Point {
        return {
            x: a.x,
            y: a.y,
        };
    }

    export function PointAdd(a: Point, b: Point): Point {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
        };
    }

    export function PointSub(a: Point, b: Point): Point {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
        };
    }

    export function PointDotProduct(a: Point, b: Point): number {
        return a.x * b.y + a.y * b.x;
    }

}
