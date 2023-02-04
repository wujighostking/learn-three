import {
  AxesHelper,
  BoxGeometry,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial} from "three"
import { OimoPhysics } from 'three/examples/jsm/physics/OimoPhysics.js'
import { scene } from "./init"

let floor: Mesh
let meshes: InstancedMesh
let physics
// const position: Vector3 = new Vector3()

function createFloor() {
  // const planeGeometry = new PlaneGeometry(10, 5, 10)
  const planeGeometry = new BoxGeometry(100, 0, 100)
  const materical = new MeshBasicMaterial({
    color: 0x111111,
    side: DoubleSide
  })
  floor = new Mesh(planeGeometry, materical)
  // floor.rotateX((Math.PI / 180) * -90)
  floor.receiveShadow = true
  scene.add(floor)
}

function createCube() {
  const count = 100
  const boxGeometry = new BoxGeometry(0.1, 0.1, 0.1)
  const materical = new MeshLambertMaterial()
  meshes = new InstancedMesh(boxGeometry, materical, count)
  meshes.instanceMatrix.setUsage(DynamicDrawUsage)
  meshes.castShadow = true
  meshes.receiveShadow = true

  scene.add(meshes)
}

async function createPhysics() {
  physics = await OimoPhysics()
  physics.addMesh(floor)
  physics.addMesh(meshes, 1)
}
createCube()
createFloor()
createPhysics()

scene.add(new AxesHelper(30))





