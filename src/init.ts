import { Color, HemisphereLight, Intersection, Mesh, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mesh, color } from './raycase'
import './style.css'

const innerWidth: number = window.innerWidth
const innerHeight: number = window.innerHeight
const mouse = new Vector2(2, 2)
const raycaster = new Raycaster()
export let scene: Scene
export let perspectiveCamera: PerspectiveCamera
let webGLRenderer: WebGLRenderer
let canvasElement: HTMLCanvasElement
let controls: OrbitControls

init()
initRender(window)

function init() {
  initScene()
  initCamera()
  initLight()
}
function initRender(window: Window) {
  webGLRenderer = new WebGLRenderer()
  canvasElement = webGLRenderer.domElement
  document.body.appendChild(canvasElement)
  webGLRenderer.setSize(innerWidth, innerHeight)

  initControls()


  window.addEventListener('resize', () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    perspectiveCamera.aspect = innerWidth / innerHeight
    perspectiveCamera.updateProjectionMatrix()
    webGLRenderer.setSize(innerWidth, innerHeight)
  })
}

function initScene() {
  scene = new Scene()
  scene.background = new Color(0x808080)
}

function initCamera() {
  perspectiveCamera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.01,
    100000
  )
  perspectiveCamera.position.set(30, 30, 30)
  perspectiveCamera.lookAt(0, 0, 0)
  scene.add(perspectiveCamera)
}

function render() {
  webGLRenderer.render(scene, perspectiveCamera)
}

function initControls() {
  controls = new OrbitControls(perspectiveCamera, canvasElement)
}

function initLight() {
  // ambientLight =  new AmbientLight(0xffffff, 0.7)
  // scene.add(ambientLight)

  const light = new HemisphereLight(0xffffff, 0x888888);
  light.position.set(0, 1, 0);
  scene.add(light);
}

function onPointerMove(event: MouseEvent) {
  // 归一化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
}
window.addEventListener('mousemove', onPointerMove)

let timer: number = 0
function animate() {
  if (timer) cancelAnimationFrame(timer)
  timer = requestAnimationFrame(animate)

  raycaster.setFromCamera(mouse, perspectiveCamera)
  const intersectObject: Intersection[] = raycaster.intersectObject(mesh)
  if (intersectObject.length > 0) {
    const instanceId: number | undefined = intersectObject[0].instanceId
    mesh.getColorAt(instanceId as number, color)
    if (color.equals(new Color().setHex(0xffffff))) {
      mesh.setColorAt(instanceId as number, color.setHex(Math.random() * 0xffffff));
      if (mesh.instanceColor) {
        mesh.instanceColor.needsUpdate = true
      }
    }
  }

  controls.update()
  render()
}
setTimeout(() => {
  animate()
}, 500);
