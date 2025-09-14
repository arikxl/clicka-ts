/* eslint-disable react-refresh/only-export-components */
import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../supabase-client";

interface AuthContextType {
    user: User | null;
    loginWithGoogle: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // מקשיב לכל שינוי ביוזר ומרענן את התצוגה בכל חיבור או ניתוק יוזר
        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        // מתנתק מהליסנטר כדי שלא יהיה רינדור אינסופי
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);


    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({ provider: "google" });
    };

    const logOut = () => {
        supabase.auth.signOut();
    };



    return <AuthContext.Provider value={{ user, loginWithGoogle, logOut }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = ():AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
};