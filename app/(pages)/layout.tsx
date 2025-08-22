import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout =async ({ children }: any) => {
  const { userId }=await auth()

  if(!userId){
    // redirect("/sign-in")
  }
  return (
    <div>
      Protected Route
      {children}
    </div>
  );
};

export default Layout;
