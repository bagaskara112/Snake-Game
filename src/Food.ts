import { Point } from './Snake';

export class Food {
    position: Point;

    constructor(gridWidth: number, gridHeight: number) {
        this.position = this.getRandomPosition(gridWidth, gridHeight);
    }

    getRandomPosition(width: number, height: number): Point {
        return {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    }

    respawn(width: number, height: number, snakeBody: Point[]) {
        let newPos: Point;
        let onSnake = true;
        do {
            newPos = this.getRandomPosition(width, height);
            const check = newPos;
            onSnake = snakeBody.some(segment => segment.x === check.x && segment.y === check.y);
        } while (onSnake);

        this.position = newPos;
    }
}