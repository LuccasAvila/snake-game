window.onload = function() {
    const canvas = document.querySelector('#snakeGame')
    const ctx = canvas.getContext('2d')

    // Set game variables
    const boxSize = 16
    const boxAmount = canvas.width / boxSize
    // Create the snake
    const snake = []
    // Set snake head position
    snake[0] = {
        x: 32,
        y: 32
    }
    // Create the food
    let food = randomCoords()
    let direction = 'right'

    const game = setInterval(update, 200)

    document.addEventListener('keydown', (event) => {
        if(event.keyCode == 37 && direction != 'right') direction = 'left'
        if(event.keyCode == 38 && direction != 'down') direction = 'up'
        if(event.keyCode == 39 && direction != 'left') direction = 'right'
        if(event.keyCode == 40 && direction != 'up') direction = 'down'
    })
    
    function update() {
        // Move the snake according to the direction
        switch(direction) {
            case 'left':
                snake[0].x -= boxSize
                break
            case 'right':
                snake[0].x += boxSize
                break
            case 'up':
                snake[0].y -= boxSize
                break
            case 'down':
                snake[0].y += boxSize
                break
        }

        // Prevents the snake from leaving the screen
        if(snake[0].x > canvas.width - boxSize) {
            snake[0].x = 0
        }
        if(snake[0].x < 0) {
            snake[0].x = canvas.width
        }
        if(snake[0].y > canvas.height - boxSize) {
            snake[0].y = 0
        }
        if(snake[0].y < 0) {
            snake[0].y = canvas.height
        }

        // Render the background
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Render the food
        ctx.fillStyle = 'green'
        ctx.fillRect(food.x, food.y, boxSize, boxSize)
    
        // Render the snake
        ctx.fillStyle = 'white'
        for(let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, boxSize - 1, boxSize - 1)
        }

        // Create the new position of snake head
        const newPosition = {
            x: snake[0].x,
            y: snake[0].y
        }

        // If the snake gets the food
        if(snake[0].x == food.x && snake[0].y == food.y) {
            // Generate new food
            food = randomCoords()
        } else {
            // Remove the old snake head position
            snake.pop()
        }
        

        snake.unshift(newPosition)
    }

    function randomCoords() {
        return {
            x: Math.floor(Math.random() * boxAmount) * boxSize,
            y: Math.floor(Math.random() * boxAmount) * boxSize
        }
    }
}