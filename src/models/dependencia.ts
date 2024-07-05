import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  linkType: { type: String, required: true },
  firewall: { type: String, required: true },
  ipInside: { type: String, required: true },
  ipOutside: { type: String, required: true },
  referencia: { type: String, required: true },
})

const collection = 'dependencia'

const Dependencia = mongoose.model(collection, schema)

export default Dependencia
