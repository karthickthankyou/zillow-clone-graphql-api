import * as fs from 'fs'
import {
  CreateLocationStatsInput,
  LocationStatsType,
} from '../generated/graphql'

// Read the data.sql file
const data = fs.readFileSync('locationStats.sql', 'utf8')

// Extract the rows
const rows = data.split('\n').slice(1) // Remove the first line (COPY ...)

// Function to convert a row to a CreateLocationStatsInput object
const convertRowToLocationStats = (row): CreateLocationStatsInput => {
  const [id, total_homes, lat, lng, price_sqft, type, beds_price] =
    row.split('\t')

  let bedPrices = []

  try {
    bedPrices = JSON.parse(beds_price).map((bedPrice) => ({
      avg: bedPrice.avg,
      beds: bedPrice.beds,
      count: bedPrice.count,
      sqftAvg: bedPrice.sqftAvg,
    }))
  } catch (error) {
    console.error(`Error parsing beds_price JSON: ${beds_price}`)
  }

  return {
    name: id,
    lat: parseInt(lat, 10),
    lng: parseInt(lng, 10),
    priceSqft: parseInt(price_sqft, 10),
    totalHomes: parseInt(total_homes, 10),
    type: type === 'state' ? LocationStatsType.State : LocationStatsType.City,
    bedPrices,
  }
}

// Convert the rows to CreateLocationStatsInput objects
const locationStats = rows.map((row) => convertRowToLocationStats(row))

// Write the results to a new file
fs.writeFileSync(
  'locationStatsOutput.js',
  `export const locationStats: CreateLocationStatsInput[] = ${JSON.stringify(
    locationStats,
    null,
    2,
  )} as CreateLocationStatsInput[];\n`,
)
