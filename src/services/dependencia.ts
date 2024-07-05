import type Dependencia from '../interfaces/Dependencia'
import type { Model } from 'mongoose'
class DependenciaService {
  public DependenciaModel: Model<Dependencia>
  constructor(DependenciaModel: Model<Dependencia>) {
    this.DependenciaModel = DependenciaModel
  }

  async create(dependenciaData: Dependencia) {
    try {
      const dependencia = await this.DependenciaModel.create(dependenciaData)
      return dependencia
    } catch (error) {
      throw new Error(
        `Ha ocurrido un error al intentar crear la dependencia: ${error}`,
      )
    }
  }
}

export default DependenciaService
