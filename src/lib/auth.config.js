export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user = {
            id: token.id,
            isAdmin: token.isAdmin,
          };
        }
        return session;
      },
      authorized({ auth, request }) {
        const user = auth?.user;
        const pathname = request.nextUrl?.pathname;
  
        const protectedRoutes = ["/encryption", "/decryption", "/gallery"];
        const publicRoutes = ["/login", "/register"];
  
        // Restrict protected pages if user is not logged in
        if (protectedRoutes.includes(pathname) && !user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
  
        // Prevent logged-in users from accessing login/register pages
        if (publicRoutes.includes(pathname) && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
  
        return true; // Allow access otherwise
      },
    },
  };
  