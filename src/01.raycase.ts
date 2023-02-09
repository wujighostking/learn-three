import { AxesHelper, Color, IcosahedronGeometry, InstancedMesh, Intersection, Matrix4, Mesh, MeshPhongMaterial, Raycaster, Vector2 } from 'three'
import { perspectiveCamera, scene } from './init'

let meshes: InstancedMesh
const raycaster: Raycaster = new Raycaster()
const color = new Color(1, 0, 1)
const white = new Color(1, 1, 1)
function createSpheres() {
  const geometry = new IcosahedronGeometry(0.5, 3);
  const material = new MeshPhongMaterial({ color: 0xffffff });
  const amount = 10, count = amount ** 3
  const color = new Color()

  meshes = new InstancedMesh(geometry, material, count);

  let i = 0;
  const offset = (amount - 1) / 2  // 4.5
  const matrix = new Matrix4()
  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        // [
        //   4.5, 4.5,  4.5,
        //   4.5, 4.5,  3.5,
        //   4.5, 4.5,  2.5,
        //   4.5, 4.5,  1.5,
        //   4.5, 4.5,  0.5,
        //   4.5, 4.5, -0.5,
        // ]
        matrix.setPosition(offset - x, offset - y, offset - z)
        meshes.setMatrixAt(i, matrix)
        meshes.setColorAt(i, color)
        i++
      }
    }
  }

  // mesh.instanceMatrix.needsUpdate = true
  scene.add(meshes);
}

const mouse = new Vector2(2, 2)
function onPointerMove(event: MouseEvent) {
  // 归一化
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
}
function sphereColour() {
  raycaster.setFromCamera(mouse, perspectiveCamera)
  const intersectionObject: Intersection[] = raycaster.intersectObject(meshes)
  const instancdId: number | undefined = intersectionObject[0]?.instanceId as number
  meshes.getColorAt(instancdId as number, color)

  if (color.equals(white)) {
    meshes.setColorAt(instancdId, color.setHex(0xffffff * Math.random()))
    meshes.instanceColor && (meshes.instanceColor.needsUpdate = true)

  }

  requestAnimationFrame(sphereColour)
}

createSpheres()
window.addEventListener('mousemove', onPointerMove)
sphereColour()

scene.add(new AxesHelper(20))
