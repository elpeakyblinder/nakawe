"use client"
import type React from "react"
import Link from "next/link"
import { useState } from "react"
import RegisterForm from '@/components/features/auth/RegisterForm';


export default function RegisterPage() {

    return (
        <div>
            <RegisterForm />
        </div>
    );
}