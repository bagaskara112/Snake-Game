import { Snake } from './Snake';
import { Food } from './Food';
import { Renderer } from './Renderer';
import { Particle } from './Particle';

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    lastTime: number;
    accumulator: number;
    tickRate: number;

    snake: Snake;
    food: Food;
    renderer: Renderer;
    particles: Particle[] = [];

    width: number;
    height: number;
    tileSize: number;

    isRunning: boolean;
    score: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        // Config
        this.tileSize = 20;
        this.width = 40;
        this.height = 30;
        this.tickRate = 0.08;

        // Set Canvas Size
        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;

        // Init entities
        this.snake = new Snake(10, 10);
        this.food = new Food(this.width, this.height);
        this.renderer = new Renderer(this.ctx, this.width, this.height, this.tileSize);

        this.lastTime = 0;
        this.accumulator = 0;
        this.isRunning = false;
        this.score = 0;

        this.bindInput();
    }

    bindInput() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    this.snake.setDirection('UP');
                    break;
                case 'ArrowDown':
                case 's':
                    this.snake.setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.snake.setDirection('LEFT');
                    break;
                case 'ArrowRight':
                case 'd':
                    this.snake.setDirection('RIGHT');
                    break;
                case ' ':
                    if (!this.isRunning) this.start();
                    break;
            }
        });
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    }

    loop(currentTime: number) {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.accumulator += deltaTime;

        while (this.accumulator >= this.tickRate) {
            this.updateLogic();
            this.accumulator -= this.tickRate;
        }

        // Update visuals (particles) every frame
        this.updateParticles();

        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    updateLogic() {
        this.snake.update();

        // Check Food
        const head = this.snake.body[0];
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.snake.grow();
            this.score += 10;
            this.spawnParticles(head.x * this.tileSize + 10, head.y * this.tileSize + 10, '#f0f');
            this.food.respawn(this.width, this.height, this.snake.body);
        }

        // Check Collision
        if (this.snake.checkCollision(this.width, this.height)) {
            this.gameOver();
        }
    }

    spawnParticles(x: number, y: number, color: string) {
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    updateParticles() {
        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => p.life > 0);
    }

    render() {
        this.renderer.clear();
        this.renderer.drawGrid();
        this.renderer.drawFood(this.food);
        this.renderer.drawSnake(this.snake);
        this.renderer.drawParticles(this.particles);

        // Draw Score
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 20px Inter, sans-serif';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }

    gameOver() {
        this.isRunning = false;
        alert(`Game Over! Score: ${this.score}`);
        location.reload();
    }
}
