declare module 'three/examples/jsm/physics/OimoPhysics' {
  interface IOimoPhysics {
    addMesh(mesh: Mesh, mass: number): void
    setMeshPosition(mesh: Mesh, position: Vector3, index: number): void
  }
  export function OimoPhysics(): Promise<IOimoPhysics>
}
