import ComisionesService from './comisiones.service'
import Comisiones from '../models/comisiones'

//@ts-ignore
const service = new ComisionesService(Comisiones)
class EstadisticaService {
  async getEstadisticasTotales() {
    const comisiones = await service.getAll()
    let horasTrabajo = 0
    let horasViaje = 0
    let numeroComisiones = 0

    for (const comision of comisiones) {
      horasTrabajo += comision.timeJob
      horasViaje += comision.timeJourney
      numeroComisiones++
    }
    return {
      totalHoras: horasTrabajo + horasViaje,
      horasTrabajo,
      horasViaje,
      numeroComisiones,
    }
  }
  async getEstadisticasMensuales(mes: number, año: number) {
    const comisiones = await service.getAll()

    let totalHorasTrabajo = 0
    let totalHorasViaje = 0

    for (const comision of comisiones) {
      const fecha = new Date(comision.date)
      if (fecha.getMonth() === mes - 1 && fecha.getFullYear() === año) {
        totalHorasTrabajo += comision.timeJob
        totalHorasViaje += comision.timeJourney
      }
    }
    return {
      mes,
      año,
      totalHorasTrabajo,
      totalHorasViaje,
      totalCombinado: totalHorasTrabajo + totalHorasViaje,
    }
  }

  async getEstadisticasAnuales(ano: Date) {
    const comisiones = await service.getAll()
    let totalHorasTrabajo = 0
    let totalHorasViaje = 0

    for (const comision of comisiones) {
      const fecha = new Date(comision.date)
      //@ts-ignore
      if (fecha.getFullYear() === ano.getFullYear()) {
        totalHorasTrabajo += comision.timeJob
        totalHorasViaje += comision.timeJourney
      }
    }
    return {
      totalHorasTrabajo,
      totalHorasViaje,
    }
  }
}

export default EstadisticaService
