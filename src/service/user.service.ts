import { ResultSetHeader } from "mysql2"
import { pool } from "../db/mysql.db"
import { User } from "../entities/User"
import { INTERNAL_RESPONSE, ServiceResponse } from "../utils"
import bcryptjs from "bcryptjs"

export const login = async (email: string, password: string): Promise<ServiceResponse> => {
  try {
    const q = "select id, username, password from users where email = ? limit 1"
    const [rows] = await pool.query<any[]>(q, [email])
    
    // if (rows.length === 0) {
    //   return {
    //     ok: false,
    //     message: "Not found",
    //     data: null
    //   }
    // }

    const con = await pool.getConnection()
    con.release()

    const found = rows[0]
    const isMatch = await bcryptjs.compare(password, found.password)
    
    return {
      ok: isMatch,
      message: isMatch ? "Authenticated" : "Invalid credentials",
      data: isMatch ? { id: found.id, username: found.username } : null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const signup = async (user: User): Promise<ServiceResponse> => {
  try {
    const q = "insert into users (name, lastname, username, email, password, age, created_at) values (?, ?, ?, ?, ?, ?, ?)"
    const hashed = await bcryptjs.hash(user.password, 10)
    const [result] = await pool.query<ResultSetHeader>(q, [user.name, user.lastname, user.username, user.email, hashed, user.age, new Date()])
    const success = result.insertId > 0

    const con = await pool.getConnection()
    con.release()
    
    return {
      ok: success,
      message: success ? "Successfully registered" : "Unable to register",
      data: success ? { id: result.insertId, username: user.username } : null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const getProfile = async (id: number): Promise<ServiceResponse> => {
  try {
    const q = "select id, username, name, lastname, age, created_at from users where id = ? limit 1"
    const [result] = await pool.query<any[]>(q, [id])

    return {
      ok: true,
      message: "",
      data: result[0]
    }
  } catch {
    return INTERNAL_RESPONSE
  }
}

export const getSecurity = async (id: number): Promise<ServiceResponse> => {
  try {
    const q = "select id, email from users where id = ? limit 1"
    const [result] = await pool.query<any[]>(q, [id])

    return {
      ok: true,
      message: "",
      data: result[0]
    }
  } catch {
    return INTERNAL_RESPONSE
  }
}

export const updateInfo = async (id: number, payload: User): Promise<ServiceResponse> => {
  try {
    const q = "update users set name = ?, lastname = ?, username = ?, age = ? where id = ?"
    const [result] = await pool.query<ResultSetHeader>(q, [payload.name, payload.lastname, payload.username, payload.age, id])
    const success = result.affectedRows === 1

    const con = await pool.getConnection()
    con.release()
    
    return {
      ok: success,
      message: success ? "Information updated" : "Could not update",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}

export const changePassword = async (id: number, newPassword: string, oldPassword: string): Promise<ServiceResponse> => {
  try {
    const firstQ = "select password from users where id = ? limit 1"
    const [rows] = await pool.query<any[]>(firstQ, [id])
    const found = rows[0]
    const isMatch = await bcryptjs.compare(oldPassword, found.password)
    if (!isMatch) {
      return {
        ok: false,
        message: "Invalid credentials.",
        data: null
      }
    }

    const q = "update users set password = ? where id = ?"
    const hashed = await bcryptjs.hash(newPassword, 10)
    const [result] = await pool.query<ResultSetHeader>(q, [hashed, id])
    const success = result.affectedRows === 1

    const con = await pool.getConnection()
    con.release()
    
    return {
      ok: success,
      message: success ? "Password changed" : "Could not change the password",
      data: null
    }
  } catch (error) {
    return INTERNAL_RESPONSE
  }
}
