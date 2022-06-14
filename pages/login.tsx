import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const { data: session } = useSession()
  const [loginForm, setLoginForm] = useState({
    user: "jsmith",
    password: "",

  })
  const { user, password } = loginForm
  const onChange = (e: any) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }
  const onLogin = async (e: any) => {
    e.preventDefault()
    const response = (await signIn("credentials", {
      user,
      password,
      redirect: false,
    })) as any;

    console.log(response)
  }
  return (
    <div>
      <h1>El login</h1>
      <h2>{session?.user?.name}</h2>
      <form onSubmit={(e) => { onLogin(e) }}>

        <input type="text" name='user' onChange={onChange} value={user} />
        <input type="password" name='password' onChange={onChange} value={password} />
        <button type="submit">signin</button>
      </form>
    </div>
  );
}

export default Login;

