import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Target, Lightbulb, Timer, Trophy, ArrowRight, Rotate3d, Maximize2 } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import KatexSpan from "@/components/katex-span"

interface VisualizationProblem {
  id: number
  title: string
  description: string
  dimension: "2D" | "3D"
  type: "linear" | "unconstrained" | "constrained"
  objectiveFunction: string
  constraints?: string[]
  solution: {
    x: number
    y: number
    z?: number
  }
  tolerance: number
  explanation: string
}

const problems: VisualizationProblem[] = [
  {
    id: 1,
    title: "2D Linear Programming",
    description: "Find the maximum of the objective function subject to the given constraints",
    dimension: "2D",
    type: "linear",
    objectiveFunction: "maximize 3x + 2y",
    constraints: [
      "x + y ≤ 4",
      "2x + y ≤ 6",
      "x ≥ 0",
      "y ≥ 0"
    ],
    solution: { x: 2, y: 2 },
    tolerance: 0.5,
    explanation: "The optimal solution occurs at the intersection of the constraints x + y ≤ 4 and 2x + y ≤ 6. This point (2,2) gives the maximum value of 10 for the objective function 3x + 2y."
  },
  {
    id: 2,
    title: "3D Unconstrained Optimization",
    description: "Find the minimum of the objective function in 3D space",
    dimension: "3D",
    type: "unconstrained",
    objectiveFunction: "minimize x² + y² + z²",
    solution: { x: 0, y: 0, z: 0 },
    tolerance: 0.5,
    explanation: "The function x² + y² + z² represents a sphere centered at the origin. The minimum value occurs at the center point (0,0,0) where all variables are zero."
  },
  {
    id: 3,
    title: "3D Constrained Optimization",
    description: "Find the maximum of the objective function subject to the sphere constraint",
    dimension: "3D",
    type: "constrained",
    objectiveFunction: "maximize x + y + z",
    constraints: ["x² + y² + z² ≤ 1"],
    solution: { x: 0.577, y: 0.577, z: 0.577 },
    tolerance: 0.1,
    explanation: "The maximum of x + y + z on the unit sphere occurs at the point where the gradient of the objective function is parallel to the gradient of the constraint. This point is (1/√3, 1/√3, 1/√3) ≈ (0.577, 0.577, 0.577)."
  }
]

export function OptimizationVisualizationGame() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number; z?: number } | null>(null)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xf0f0f0)

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    cameraRef.current = camera
    camera.position.z = 5

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current || !problems[currentProblem]) return

    // Clear previous objects
    while (sceneRef.current.children.length > 0) {
      const object = sceneRef.current.children[0]
      if (object instanceof THREE.GridHelper) {
        sceneRef.current.remove(object)
      } else {
        sceneRef.current.remove(object)
      }
    }

    // Add grid helper back
    const gridHelper = new THREE.GridHelper(10, 10)
    sceneRef.current.add(gridHelper)

    const problem = problems[currentProblem]
    if (problem.dimension === "2D") {
      // Draw 2D visualization
      draw2DVisualization(problem)
    } else {
      // Draw 3D visualization
      draw3DVisualization(problem)
    }
  }, [currentProblem])

  const draw2DVisualization = (problem: VisualizationProblem) => {
    if (!sceneRef.current) return

    // Draw feasible region
    const geometry = new THREE.PlaneGeometry(4, 4)
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.2
    })
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI / 2
    sceneRef.current.add(plane)

    // Draw objective function line
    const lineGeometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      -2, 0, 0,
      2, 0, 0
    ])
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const line = new THREE.Line(lineGeometry, lineMaterial)
    sceneRef.current.add(line)
  }

  const draw3DVisualization = (problem: VisualizationProblem) => {
    if (!sceneRef.current) return

    if (problem.type === "unconstrained") {
      // Draw 3D surface
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5
      })
      const sphere = new THREE.Mesh(geometry, material)
      sceneRef.current.add(sphere)

      // Add lighting
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(1, 1, 1)
      sceneRef.current.add(light)
    } else if (problem.type === "constrained") {
      // Draw constraint sphere
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.3
      })
      const sphere = new THREE.Mesh(geometry, material)
      sceneRef.current.add(sphere)

      // Draw objective function plane
      const planeGeometry = new THREE.PlaneGeometry(2, 2)
      const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5
      })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.position.set(0, 0, 0)
      sceneRef.current.add(plane)
    }
  }

  const handlePointSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // Convert screen coordinates to world coordinates
    const vector = new THREE.Vector3(x, y, 0.5)
    vector.unproject(cameraRef.current)
    vector.z = 0

    setSelectedPoint({ x: vector.x, y: vector.y })
    checkSolution(vector)
  }

  const checkSolution = (point: THREE.Vector3) => {
    const problem = problems[currentProblem]
    const solution = problem.solution
    const distance = Math.sqrt(
      Math.pow(point.x - solution.x, 2) +
      Math.pow(point.y - solution.y, 2) +
      (solution.z ? Math.pow(point.z - solution.z, 2) : 0)
    )

    if (distance <= problem.tolerance) {
      setScore(prev => prev + 1)
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(prev => prev + 1)
        setSelectedPoint(null)
      } else {
        setGameCompleted(true)
      }
    }
  }

  const resetGame = () => {
    setCurrentProblem(0)
    setSelectedPoint(null)
    setScore(0)
    setGameCompleted(false)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
    // Highlight the solution point in the visualization
    if (sceneRef.current && problems[currentProblem]) {
      const solution = problems[currentProblem].solution
      const geometry = new THREE.SphereGeometry(0.1, 16, 16)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(solution.x, solution.y, solution.z || 0)
      sceneRef.current.add(sphere)
    }
  }

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1)
      setSelectedPoint(null)
      setShowAnswer(false)
    } else {
      setGameCompleted(true)
    }
  }

  return (
    <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
      <CardHeader>
        <CardTitle className="font-serif">Optimization Visualization Challenge</CardTitle>
        <CardDescription>Test your understanding of optimization problems in different dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!gameCompleted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <span className="font-medium">Problem {currentProblem + 1} of {problems.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">Score: {score}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">{problems[currentProblem].title}</h3>
                  <p className="text-sm text-muted-foreground">{problems[currentProblem].description}</p>
                  <div className="mt-2">
                    <MathJaxContext config={{
                      loader: { load: ["[tex]/html"] },
                      tex: {
                        packages: { "[+]": ["html"] },
                        inlineMath: [["$", "$"]],
                        displayMath: [["$$", "$$"]]
                      }
                    }}>
                      <MathJax inline>
                        {`$${problems[currentProblem].objectiveFunction}$`}
                      </MathJax>
                      {problems[currentProblem].constraints?.map((constraint, index) => (
                        <MathJax key={index} inline>
                          {`$${constraint}$`}
                        </MathJax>
                      ))}
                    </MathJaxContext>
                  </div>
                </div>

                <div
                  ref={containerRef}
                  className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer"
                  onClick={handlePointSelect}
                >
                  {/* Three.js canvas will be inserted here */}
                </div>

                {selectedPoint && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Selected point: ({selectedPoint.x.toFixed(2)}, {selectedPoint.y.toFixed(2)}
                      {selectedPoint.z !== undefined ? `, ${selectedPoint.z.toFixed(2)}` : ""})
                    </p>
                  </div>
                )}

                {showAnswer && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <h4 className="font-medium">Solution:</h4>
                    <p className="text-sm text-muted-foreground">
                      The optimal solution is at point ({problems[currentProblem].solution.x.toFixed(3)}, 
                      {problems[currentProblem].solution.y.toFixed(3)}
                      {problems[currentProblem].solution.z !== undefined ? 
                        `, ${problems[currentProblem].solution.z.toFixed(3)}` : ""})
                    </p>
                    <h4 className="font-medium mt-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {problems[currentProblem].explanation}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={handleShowAnswer}
                    disabled={showAnswer}
                  >
                    Show Answer
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleNext}
                    disabled={!showAnswer}
                  >
                    Next Problem
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-serif">Congratulations!</h3>
              <p className="text-sm text-muted-foreground">
                You've completed all visualization problems with a score of {score} out of {problems.length}!
              </p>
              <Button onClick={resetGame} className="hover:scale-105 transition-transform">
                Play Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 