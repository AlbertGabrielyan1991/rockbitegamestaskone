const canvas = document.getElementById('myCanvas') as HTMLFormElement | null;
const ctx = canvas?.getContext('2d');
let balls: Ball[] = [];

class Ball {
    private readonly x: number;
    private y: number;
    private readonly radius: number;
    private speedPx: number;
    private readonly gravity: number;
    private readonly damping: number;
    private readonly bounceThreshold: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.speedPx = 0;
        this.gravity = 0.6;
        this.damping = 0.7;
        this.bounceThreshold = 1.0; // Velocity below which the circle stops bouncing
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update(): void {
        this.speedPx += this.gravity;
        this.y += this.speedPx;

        // Bounce when hitting the bottom

        if (this.y + this.radius > canvas?.height) {
            this.y = canvas?.height - this.radius;
            this.speedPx *= -this.damping;

            // Stop the circle if the bounce velocity is very low
            if (Math.abs(this.speedPx) < this.bounceThreshold) {
                this.speedPx = 0;
            }
        }

        this.draw();
    }
}

function animate(): void {
    ctx.clearRect(0, 0, canvas?.width, canvas?.height);
    for (let ball of balls) {
        ball.update();
    }
    requestAnimationFrame(animate);
}

function addBall({clientY, clientX}: MouseEvent): void {
    const {left, top} = canvas?.getBoundingClientRect() as DOMRect || {};
    const x: number = clientX - left;
    const y: number = clientY - top;
    balls.push(new Ball(x, y));
}

canvas?.addEventListener('click', addBall);

animate();