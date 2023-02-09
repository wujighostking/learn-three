import {
  AxesHelper,
  BoxGeometry,
  Color,
  DynamicDrawUsage,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  ShadowMaterial,
  Vector3
} from "three"
import { IOimoPhysics, OimoPhysics } from 'three/examples/jsm/physics/OimoPhysics'
import { scene } from "./init"

const count = 100
let floor: Mesh
let meshes: InstancedMesh
let spheres: InstancedMesh
let physics: IOimoPhysics
const position: Vector3 = new Vector3()

function createFloor() {
  // const planeGeometry = new PlaneGeometry(10, 5, 10)
  const planeGeometry = new BoxGeometry(10, 5, 10)
  const materical = new ShadowMaterial({
    color: 0x111111
  })
  floor = new Mesh(planeGeometry, materical)
  // floor.rotateX((Math.PI / 180) * -90)
  floor.position.set(0, -1.5, 0)
  floor.castShadow = true
  floor.receiveShadow = true
  scene.add(floor)
}

function createCube() {
  const boxGeometry = new BoxGeometry(0.1, 0.1, 0.1)
  const materical = new MeshLambertMaterial()
  meshes = new InstancedMesh(boxGeometry, materical, count)
  const matrix = new Matrix4()
  for (let i = 0; i < count; i++) {
    matrix.setPosition(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5)
    meshes.setColorAt(i, new Color(0xffffff * Math.random()))
    meshes.setMatrixAt(i, matrix)
  }
  meshes.instanceMatrix.needsUpdate = true
  meshes.instanceMatrix.setUsage(DynamicDrawUsage)
  meshes.castShadow = true
  meshes.receiveShadow = true

  scene.add(meshes)
}

function createSphere() {
  const icosahedronGeometry = new IcosahedronGeometry(0.1, 3)
  const materical = new MeshLambertMaterial()
  spheres = new InstancedMesh(icosahedronGeometry, materical, count)
  const matrix = new Matrix4()
  for (let i = 0; i < count; i++) {
    matrix.setPosition(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5)
    spheres.setColorAt(i, new Color(0xffffff * Math.random()))
    spheres.setMatrixAt(i, matrix)
  }
  spheres.instanceMatrix.needsUpdate = true
  spheres.instanceMatrix.setUsage(DynamicDrawUsage)
  spheres.castShadow = true
  spheres.receiveShadow = true

  scene.add(spheres)
}

/**
  import { Mesh, Vector3 } from '../../../src/Three'
  interface IOimoPhysics {
    addMesh(mesh: Mesh, mass: number): void;
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void;
  }
  export function OimoPhysics(): Promise<IOimoPhysics>
*/
async function createPhysics() {
  physics = await OimoPhysics()
  physics.addMesh(floor, 0)
  physics.addMesh(meshes, 1)
  physics.addMesh(spheres, 1)
}

export function resetMeshPosition(): void {
  let index: number = Math.floor(Math.random() * meshes.count)
  physics?.setMeshPosition(meshes, position.set(0, 2.5, 0), index)

  Math.floor(Math.random() * spheres.count)
  physics?.setMeshPosition(spheres, position.set(0, 2.5, 0), index)

  requestAnimationFrame(resetMeshPosition)
}


createCube()
createSphere()
createFloor()
createPhysics()

resetMeshPosition()

scene.add(new AxesHelper(30))





