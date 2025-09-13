"use client"

import { useEffect, useRef } from "react"

export default function MoonHopGame() {
  const gameRef = useRef<any>(null)

  useEffect(() => {
    const initGame = async () => {
      const Phaser = await import("phaser")

      // Define classes after Phaser is loaded
      class BootScene extends Phaser.Scene {
        constructor() {
          super({ key: "BootScene" })
        }

        preload() {
          const graphics = this.make.graphics({ x: 0, y: 0 })

          // Turtle texture
          graphics.fillStyle(0x4ade80, 1)
          graphics.fillRoundedRect(0, 0, 40, 25, 8)
          graphics.fillStyle(0x22c55e, 1)
          graphics.fillCircle(35, 12, 8)
          graphics.fillCircle(5, 12, 6)
          graphics.fillCircle(15, 12, 4)
          graphics.fillCircle(25, 12, 4)
          graphics.generateTexture("turtle", 40, 25)
          graphics.clear()

          // Rock texture
          graphics.fillStyle(0x64748b, 1)
          graphics.fillRoundedRect(0, 0, 60, 30, 5)
          graphics.fillStyle(0x475569, 1)
          graphics.fillCircle(10, 8, 4)
          graphics.fillCircle(35, 12, 6)
          graphics.fillCircle(50, 6, 3)
          graphics.generateTexture("rock", 60, 30)
          graphics.clear()

          // Moon rock texture
          graphics.fillStyle(0x8b8b8b, 1)
          graphics.fillCircle(15, 15, 15)
          graphics.fillStyle(0x6b6b6b, 1)
          graphics.fillCircle(12, 12, 5)
          graphics.fillCircle(20, 18, 3)
          graphics.fillCircle(8, 20, 2)
          graphics.generateTexture("moonrock", 30, 30)
          graphics.clear()

          // Coin texture
          graphics.fillStyle(0xfbbf24, 1)
          graphics.fillCircle(8, 8, 8)
          graphics.fillStyle(0xf59e0b, 1)
          graphics.fillRect(6, 6, 4, 4)
          graphics.generateTexture("coin", 16, 16)
          graphics.clear()

          // Star texture
          graphics.fillStyle(0xfbbf24, 1)
          graphics.fillCircle(2, 2, 2)
          graphics.generateTexture("star", 4, 4)
          graphics.clear()

          // Watcher texture
          graphics.fillStyle(0x64748b, 1)
          graphics.fillEllipse(25, 45, 50, 20)
          graphics.fillStyle(0x475569, 1)
          graphics.fillEllipse(25, 42, 45, 15)
          graphics.fillStyle(0x8b4513, 1)
          graphics.fillRect(15, 25, 20, 25)
          graphics.fillStyle(0xdeb887, 1)
          graphics.fillCircle(25, 20, 8)
          graphics.fillStyle(0x8b4513, 1)
          graphics.fillRect(10, 30, 8, 3)
          graphics.fillRect(32, 30, 8, 3)
          graphics.fillRect(18, 45, 6, 8)
          graphics.fillRect(26, 45, 6, 8)
          graphics.fillStyle(0x000000, 1)
          graphics.fillCircle(22, 18, 1)
          graphics.fillCircle(28, 18, 1)
          graphics.fillRect(24, 22, 2, 1)
          graphics.generateTexture("watcher", 50, 55)

          graphics.destroy()
        }

        create() {
          this.scene.start("GameScene")
        }
      }

      class GameScene extends Phaser.Scene {
        private score = 0
        private coins = 0
        private entryFee = 10
        private gameSpeed = 200
        private isGameOver = false
        private hasStarted = false
        private baseObstacleDelay = 2000
        private player: any
        private ground: any
        private obstacles: any
        private collectibleCoins: any
        private scoreText: any
        private coinsText: any
        private instructionText: any
        private gameOverText: any
        private cursors: any
        private spaceKey: any
        private starEmitter: any
        private coinEmitter: any
        private obstacleTimer: any
        private coinTimer: any
        private scoreTimer: any

        constructor() {
          super({ key: "GameScene" })
        }

        create() {
          this.createBackground()
          this.createPlayer()
          this.createObstacles()
          this.createCoins()
          this.createUI()
          this.createControls()
          this.createParticles()
          this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
        }

        createBackground() {
          this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x0f0f23)

          // Add stars
          for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(0, this.scale.width)
            const y = Phaser.Math.Between(0, this.scale.height)
            const star = this.add.image(x, y, "star")
            star.setAlpha(Phaser.Math.FloatBetween(0.3, 0.8))
            star.setScale(Phaser.Math.FloatBetween(0.5, 1.5))
          }

          // Add watcher character
          const watcher = this.add.image(this.scale.width - 80, this.scale.height - 60, "watcher")
          watcher.setScale(0.5)
          watcher.setAlpha(0.6)
          watcher.setDepth(-1)

          // Ground
          this.ground = this.add.rectangle(this.scale.width / 2, this.scale.height - 10, this.scale.width, 20, 0x6b7280)
          this.physics.add.existing(this.ground, true)
        }

        createPlayer() {
          this.player = this.physics.add.sprite(80, this.scale.height - 50, "turtle")
          this.player.setCollideWorldBounds(true)
          this.player.setBounce(0.2)
          this.player.setScale(0.8)
          this.physics.add.collider(this.player, this.ground)
        }

        createObstacles() {
          this.obstacles = this.physics.add.group()
        }

        createCoins() {
          this.collectibleCoins = this.physics.add.group()
        }

        createUI() {
          this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: "16px",
            color: "#ffffff",
          })

          this.coinsText = this.add.text(10, 30, `SOL: ${this.coins}`, {
            fontSize: "16px",
            color: "#fbbf24",
          })

          this.instructionText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            `🌙 MoonHop Adventure! 🐢\n\nClick anywhere to start jumping!\nAvoid moon rocks, collect SOL coins\nGood luck, space turtle!`,
            {
              fontSize: "14px",
              color: "#ffffff",
              align: "center",
            },
          )
          this.instructionText.setOrigin(0.5)
        }

        createControls() {
          this.cursors = this.input.keyboard.createCursorKeys()
          this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

          this.input.on("pointerdown", () => {
            this.jump()
          })
        }

        createParticles() {
          this.starEmitter = this.add.particles(0, 0, "star", {
            speed: { min: 50, max: 100 },
            scale: { start: 0.3, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            lifespan: 1000,
            emitting: false,
          })

          this.coinEmitter = this.add.particles(0, 0, "coin", {
            speed: { min: 100, max: 200 },
            scale: { start: 0.5, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            lifespan: 800,
            emitting: false,
          })
        }

        jump() {
          if (!this.hasStarted) {
            this.startGame()
            return
          }

          if (this.isGameOver) {
            this.restartGame()
            return
          }

          if (this.player.body.touching.down) {
            this.player.setVelocityY(-300)
            this.starEmitter.setPosition(this.player.x, this.player.y + 15)
            this.starEmitter.explode(3)
          }
        }

        startGame() {
          this.hasStarted = true
          this.instructionText.setVisible(false)

          this.obstacleTimer = this.time.addEvent({
            delay: this.baseObstacleDelay,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true,
          })

          this.coinTimer = this.time.addEvent({
            delay: 3000,
            callback: this.spawnCoin,
            callbackScope: this,
            loop: true,
          })

          this.scoreTimer = this.time.addEvent({
            delay: 100,
            callback: this.updateScore,
            callbackScope: this,
            loop: true,
          })
        }

        spawnObstacle() {
          if (this.isGameOver) return

          const rockScale = Phaser.Math.FloatBetween(0.6, 1.0)
          const moonrock = this.physics.add.sprite(
            this.scale.width + 30,
            this.scale.height - 25 - 10 * rockScale,
            "moonrock",
          )
          moonrock.setScale(rockScale)
          moonrock.setVelocityX(-this.gameSpeed)
          this.obstacles.add(moonrock)

          this.physics.add.overlap(this.player, moonrock, this.hitObstacle, null, this)

          moonrock.checkWorldBounds = true
          moonrock.outOfBoundsKill = true

          this.updateObstacleSpeed()
        }

        updateObstacleSpeed() {
          const speedIncrease = Math.floor(this.score / 200)
          const newDelay = Math.max(1000, this.baseObstacleDelay - speedIncrease * 100)

          if (this.obstacleTimer && this.obstacleTimer.delay !== newDelay) {
            this.obstacleTimer.delay = newDelay
          }
        }

        spawnCoin() {
          if (this.isGameOver) return

          const coin = this.physics.add.sprite(this.scale.width + 30, this.scale.height - 80, "coin")
          coin.setVelocityX(-this.gameSpeed)
          this.collectibleCoins.add(coin)

          this.physics.add.overlap(this.player, coin, this.collectCoin, null, this)

          coin.checkWorldBounds = true
          coin.outOfBoundsKill = true
        }

        collectCoin(player: any, coin: any) {
          coin.destroy()
          this.coins += 5
          this.score += 100

          this.coinEmitter.setPosition(coin.x, coin.y)
          this.coinEmitter.explode(5)

          this.gameSpeed += 1
        }

        hitObstacle(player: any, rock: any) {
          this.isGameOver = true
          this.player.setTint(0xff0000)
          this.player.setVelocity(0, -150)

          if (this.obstacleTimer) this.obstacleTimer.destroy()
          if (this.coinTimer) this.coinTimer.destroy()
          if (this.scoreTimer) this.scoreTimer.destroy()

          this.obstacles.children.entries.forEach((obstacle: any) => {
            obstacle.setVelocityX(0)
          })

          this.collectibleCoins.children.entries.forEach((coin: any) => {
            coin.setVelocityX(0)
          })

          this.time.delayedCall(1000, () => {
            this.showGameOver()
          })
        }

        showGameOver() {
          this.gameOverText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            `Game Over! 💥\n\nFinal Score: ${this.score}\nSOL Collected: ${this.coins}\n\nClick to play again!`,
            {
              fontSize: "16px",
              color: "#ffffff",
              align: "center",
            },
          )
          this.gameOverText.setOrigin(0.5)
        }

        restartGame() {
          this.scene.restart()
        }

        updateScore() {
          if (!this.isGameOver) {
            this.score += 1
          }
        }

        update() {
          if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.jump()
          }

          this.scoreText.setText(`Score: ${this.score}`)
          this.coinsText.setText(`SOL: ${this.coins}`)

          // Clean up off-screen objects
          this.obstacles.children.entries.forEach((obstacle: any) => {
            if (obstacle.x < -100) {
              obstacle.destroy()
            }
          })

          this.collectibleCoins.children.entries.forEach((coin: any) => {
            if (coin.x < -100) {
              coin.destroy()
            }
          })
        }

        resize(gameSize: any) {
          const width = gameSize.width
          const height = gameSize.height

          this.cameras.resize(width, height)

          if (this.ground) {
            this.ground.setPosition(width / 2, height - 10)
            this.ground.setSize(width, 20)
          }
        }
      }

      const config: any = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.RESIZE,
          parent: "moonhop-game",
          width: 800,
          height: 256,
        },
        backgroundColor: "#0f0f23",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 400 },
            debug: false,
          },
        },
        scene: [BootScene, GameScene],
      }

      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }

      gameRef.current = new Phaser.Game(config)
    }

    initGame().catch(console.error)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return null
}
