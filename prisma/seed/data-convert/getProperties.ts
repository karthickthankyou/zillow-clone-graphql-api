import * as fs from 'fs'

// Read the data.sql file
const data = fs.readFileSync('properties.sql', 'utf8')

// Extract the rows
const rows = data.split('\n').slice(1) // Remove the first line (COPY ...)

// Function to convert a row to a CreatePropertyInput object
const convertRowToProperty = (row) => {
  const [
    id,
    createdAt,
    updatedAt,
    lat,
    lng,
    description,
    lot_size,
    features,
    city,
    state,
    facts,
    style,
    address,
    price_sqft,
    sqft,
    price,
    beds,
    bath,
    year_built,
    zipcode,
    imgs,
    plan,
    uid,
    published,
  ] = row.split('\t')

  const property = {
    address,
    bath: parseInt(bath, 10),
    beds: parseInt(beds, 10),
    city,
    description,
    facts,
    features,
    imgs: imgs?.split(',').map((img) => img.trim()), // Assuming imgs is a comma-separated list of strings
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    lotSize: parseInt(lot_size, 10),
    plan: parseInt(plan, 10),
    price: parseInt(price, 10),
    priceSqft: parseInt(price_sqft, 10),
    published: published === true,
    sellerUid: uid,
    sqft: parseInt(sqft, 10),
    state,
    style,
    yearBuilt: parseInt(year_built, 10),
    zipcode,
  }

  return property
}

// Convert the rows to CreatePropertyInput objects
const properties = rows.map((row) => convertRowToProperty(row))

// Write the results to a new file
fs.writeFileSync(
  'properties.ts',
  `export const properties = ${JSON.stringify(properties, null, 2)};\n`,
)
