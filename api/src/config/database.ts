import { getConnectionOptions, createConnection } from 'typeorm'

export class DB {
  connect = async () => {
    const ormConfig = await getConnectionOptions()
    await createConnection(ormConfig)
  }
}
export default new DB()
