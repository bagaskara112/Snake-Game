import { Snake } from './Snake';
import { Food } from './Food';

export class Renderer {
    ctx: CanvasRenderingContext2D;
    tileSize: number;
    width: number;
    height: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, tileSize: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
    }

    clear() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Trail effect
        this.ctx.fillRect(0, 0, this.width * this.tileSize, this.height * this.tileSize);
        // this.ctx.clearRect(0, 0, this.width * this.tileSize, this.height * this.tileSize);
    }

    drawSnake(snake: Snake) {
        this.ctx.fillStyle = '#0ff';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#0ff';

        snake.body.forEach((segment, index) => {
            const isHead = index === 0;
            this.ctx.fillStyle = isHead ? '#fff' : '#0ff';

            this.ctx.fillRect(
                segment.x * this.tileSize,
                segment.y * this.tileSize,
                this.tileSize - 2,
                this.tileSize - 2
            );
        });

        this.ctx.shadowBlur = 0;
    }

    drawFood(food: Food) {
        this.ctx.fillStyle = '#f0f';
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#f0f';

        this.ctx.beginPath();
        this.ctx.arc(
            food.position.x * this.tileSize + this.tileSize / 2,
            food.position.y * this.tileSize + this.tileSize / 2,
            this.tileSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        this.ctx.shadowBlur = 0;
    }

    drawParticles(particles: any[]) {
        particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;
    }

    drawGrid() {
        this.ctx.strokeStyle = '#111';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.width; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.tileSize, 0);
            this.ctx.lineTo(x * this.tileSize, this.height * this.tileSize);
            this.ctx.stroke();
        }
        for (let y = 0; y <= this.height; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.tileSize);
            this.ctx.lineTo(this.width * this.tileSize, y * this.tileSize);
            this.ctx.stroke();
        }
    }
}
