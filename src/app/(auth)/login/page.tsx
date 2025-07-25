"use client"
import type React from "react"
import Link from "next/link"
import { useState } from "react"
import LoginForm from '@/components/features/auth/LoginForm';


export default function LoginPage() {

    return (
        <div>
            <LoginForm />
        </div>
    );
}