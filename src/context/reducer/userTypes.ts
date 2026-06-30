export type User = {
    userId: string | null;
    userName: string | null;
    userEmail: string | null;
    userPhoto: string | null;
    userRole: string | null;
    userPhone: string | null;
}

export type UserAction = 
| {type: "LOGIN"; payload: any}
| {type: "LOGOUT"}
| {type: "UPDATE"; payload: Partial<User> };