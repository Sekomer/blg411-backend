// External Dependencies
import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'

// Global Variables
export const collections: {
    foods?: mongoDB.Collection
    users?: mongoDB.Collection
} = {}

// Initialize Connection
export async function connectToDatabase() {
    const result = dotenv.config({ path: '.env' })

    if (result.error) {
        throw result.error
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        process.env.DB_CONN_STRING!
    )

    await client.connect()

    const db: mongoDB.Db = client.db(process.env.DB_NAME)

    const foodCollection: mongoDB.Collection = db.collection(
        process.env.COLLECTION_NAME!
    )

    const usersCollection: mongoDB.Collection = db.collection(
        process.env.AUTH_COLLECTION!
    )

    collections.foods = foodCollection
    collections.users = usersCollection

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${foodCollection.collectionName}`
    )
}
