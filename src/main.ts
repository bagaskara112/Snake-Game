import './style.css'
import { Game } from './Game'

const app = document.querySelector<HTMLDivElement>('#app')!

// Create canvas
const canvas = document.createElement('canvas')
app.appendChild(canvas)

// Initialize Game
const game = new Game(canvas)
game.start()