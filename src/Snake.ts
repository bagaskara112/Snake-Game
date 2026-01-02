export type Point = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class Snake {
    body: Point[];
    direction: Direction;
    newDirection: Direction;
    growAmount: number;

    constructor(startX: number, startY: number) {
        this.body = [{ x: startX, y: startY }];
        this.direction = 'RIGHT';
        this.newDirection = 'RIGHT';
        this.growAmount = 0;
    }

    update() {
        this.direction = this.newDirection;
        const head = { ...this.body[0] };

        switch (this.direction) {
            case 'UP': head.y -= 1; break;
            case 'DOWN': head.y += 1; break;
            case 'LEFT': head.x -= 1; break;
            case 'RIGHT': head.x += 1; break;
        }

        this.body.unshift(head);

        if (this.growAmount > 0) {
            this.growAmount--;
        } else {
            this.body.pop();
        }
    }

    setDirection(dir: Direction) {
        if (this.direction === 'UP' && dir === 'DOWN') return;
        if (this.direction === 'DOWN' && dir === 'UP') return;
        if (this.direction === 'LEFT' && dir === 'RIGHT') return;
        if (this.direction === 'RIGHT' && dir === 'LEFT') return;
        this.newDirection = dir;
    }

    grow() {
        this.growAmount++;
    }

    checkCollision(width: number, height: number): boolean {
        const head = this.body[0];

        // Wall collision
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            return true;
        }

        // Self collision (start from index 1)
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }
}
