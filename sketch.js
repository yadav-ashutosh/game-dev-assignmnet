let ball, paddle;
    let bricks = [];
    let brickRows = 3;
    let brickCols = 10;
    let brickWidth, brickHeight;
    let brickOffsetX, brickOffsetY;
    let ballSpeedX = 5;
    let ballSpeedY = -5;

    function setup() {
      createCanvas(600, 400);
      brickWidth = width / brickCols;
      brickHeight = 20;
      brickOffsetX = brickWidth / 2;
      brickOffsetY = 50;
      createBricks();
      paddle = new Paddle();
      ball = new Ball();
    }

    function createBricks() {
      for (let i = 0; i < brickRows; i++) {
        for (let j = 0; j < brickCols; j++) {
          let x = j * brickWidth + brickOffsetX;
          let y = i * brickHeight + brickOffsetY;
          bricks.push(new Brick(x, y));
        }
      }
    }

    function draw() {
      background(0);
      for (let brick of bricks) {
        brick.show();
      }
      paddle.show();
      ball.update();
      ball.show();
      ball.checkEdges();
      ball.checkPaddleCollision();
      ball.checkBrickCollision();
      paddle.move();
    }

    class Ball {
      constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.radius = 10;
      }

      update() {
        this.x += ballSpeedX;
        this.y += ballSpeedY;
      }

      show() {
        fill(255);
        ellipse(this.x, this.y, this.radius * 2);
      }

      checkEdges() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
          ballSpeedX *= -1;
        }

        if (this.y - this.radius <= 0) {
          ballSpeedY *= -1;
        }

        if (this.y + this.radius >= height) {
          // Game over - reset the ball and paddle
          this.x = width / 2;
          this.y = height - 50;
          ballSpeedX = 5;
          ballSpeedY = -5;
        }
      }

      checkPaddleCollision() {
        if (
          this.x >= paddle.x &&
          this.x <= paddle.x + paddle.width &&
          this.y + this.radius >= paddle.y
        ) {
          ballSpeedY *= -1;
        }
      }

      checkBrickCollision() {
        for (let i = bricks.length - 1; i >= 0; i--) {
          let brick = bricks[i];
          if (
            this.x >= brick.x &&
            this.x <= brick.x + brick.width &&
            this.y - this.radius <= brick.y + brick.height
          ) {
            ballSpeedY *= -1;
            bricks.splice(i, 1);
          }
        }
      }
    }

    class Paddle {
      constructor() {
        this.width = 100;
        this.height = 10;
        this.x = width / 2 - this.width / 2;
        this.y = height - 30;
        this.speed = 5;
      }

      move() {
        if (keyIsDown(LEFT_ARROW)) {
          this.x -= this.speed;
        } else if (keyIsDown(RIGHT_ARROW)) {
          this.x += this.speed;
        }

        this.x = constrain(this.x, 0, width - this.width);
      }

      show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
      }
    }

    class Brick {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = brickWidth;
        this.height = brickHeight;
      }

      show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);
      }
    }
