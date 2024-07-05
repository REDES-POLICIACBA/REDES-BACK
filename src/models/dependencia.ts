import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  linkType: { type: String, required: true },
  firewall: { type: String, required: true },
  ipInside: { type: String, required: true },
  ipOutside: { type: String, required: true },
  referencia: { type: String, required: true },
  type: { type: String, enum: ['capital', 'interior'], required: true },
})

const collection = 'dependencias'

const Dependencias = mongoose.model(collection, schema)

export default Dependencias
