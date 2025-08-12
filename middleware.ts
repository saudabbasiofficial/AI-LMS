// middleware.ts
import { clerkMiddleware, } from "@clerk/nextjs/server";




export default clerkMiddleware()


// ✅ Set which routes Clerk should run on
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Applies Clerk to all routes except static files and API
};
