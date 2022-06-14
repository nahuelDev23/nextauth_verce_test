import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        if (user) {
          console.log(user)
          return user
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',

  },
  callbacks: {
    jwt: async ({ token, user }) => {

      if (user) {
        token.id = user.id;
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,

  }
})