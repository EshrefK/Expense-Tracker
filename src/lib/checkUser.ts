import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";


export async function checkUser() {
    const user = await currentUser();

    //check for current logged in clerk user
    if (!user){
        return null;
    }

    //check if the user is already in the database
    const loggedInUser = await db.user.findUnique({
        where:{
            clerkUserId: user.id
        }
    })

    //if user is in database return the user
    if (loggedInUser){
        return loggedInUser;
    }

    //if not in database create a new user
    const newUser = await db.user.create({
        data:{
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
        }
    })

    return newUser;
}


