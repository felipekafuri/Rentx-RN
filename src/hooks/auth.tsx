import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react'
import { database } from '../databases'
import { api } from '../services/api'
import { User } from '../databases/models/User'

interface IUser {
  user_id: string
  id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: IUser
  signIn: (credentials: SignInCredentials) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<IUser>({} as IUser)

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })

      const { user, token } = response.data

      api.defaults.headers.authorization = `Bearer ${token}`

      const userCollection = database.get<User>('users')
      await database.action(async () => {
        await userCollection.create(newUser => {
          newUser.id = user.id
          newUser.email = user.email
          newUser.name = user.name
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })

      setData({ ...user, token })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users')
      const response = await userCollection.query().fetch()

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser
        api.defaults.headers.authorization = `Bearer ${userData.token}`
        setData(userData)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const auth = useContext(AuthContext)
  return auth
}

export { useAuth, AuthProvider }
