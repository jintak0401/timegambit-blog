import { Connection } from 'oracledb';

export const closeConnection = async (connection: Connection | null) => {
  if (connection) {
    try {
      await connection.close();
    } catch (e) {
      console.error(e);
    }
  }
};
