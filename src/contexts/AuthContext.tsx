import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginForm } from '../pages/Login';
import api from '../services/api';

interface IAuthProviderProps {
  children: ReactNode
}

interface ITech {
  id: string;
  title: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  avatar_url: string;
  techs: ITech[];
  created_at: Date;
  updated_at: Date;
}

interface IResponseSession {
  user: IUser;
  token: string;
}

interface IAuthContext {
  user: any;
  signIn: (data: any) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('@context-demo:token');

      if (token) {
        try {
          api.defaults.headers.common.authorization = `Bearer ${token}`;

          const { data } = await api.get('/profile');

          console.log('busquei usuario', data);

          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const signIn = async (data: ILoginForm) => {
    const response = await api.post<IResponseSession>('/sessions', data);

    const { user: userResponse, token } = response.data;

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(userResponse);
    // sessionstorage cookies
    localStorage.setItem('@context-demo:token', token);

    navigate('/dashboard', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
