"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Cat, Dog, Smile } from "lucide-react"

interface User {
  id: string
  name: string
  type: "ADULT" | "CHILD"
}

const mockUsers: User[] = [
  { id: "1", name: "Philip", type: "ADULT" },
  { id: "2", name: "Rachel", type: "ADULT" },
  { id: "3", name: "Max", type: "CHILD" },
]

export default function LoginPage() {
  const [step, setStep] = useState<"password" | "profile">("password")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock successful login - in real app, validate password here
    if (password.trim()) {
      setStep("profile")
    }
  }

  const handleProfileSelect = (user: User) => {
    console.log("Selected profile:", user.name)
    if (user.type === "ADULT") {
      router.push("/dashboard")
    } else {
      router.push(`/dashboard/child/${user.id}`)
    }
  }

  const getUserIcon = (user: User) => {
    if (user.name === "Philip") return <Cat size={32} className="text-primary-green" />
    if (user.name === "Rachel") return <Dog size={32} className="text-primary-green" />
    if (user.name === "Max") return <Smile size={32} className="text-primary-green" />
    return <Smile size={32} className="text-primary-green" />
  }

  if (step === "password") {
    return (
      <div className="min-h-screen bg-background-beige flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border border-gray-200 bg-white backdrop-blur-sm">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-primary-green rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-main-text font-sans">MoolahVault</h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-main-text font-sans">Welcome Back!</h2>
              <p className="text-main-text/80 font-serif">Enter your family password to continue.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-text font-serif">Family Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 border-slate-200 focus:border-accent-gold focus:ring-accent-gold/20"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary-green hover:bg-primary-green/90 text-white font-semibold rounded-lg transition-colors duration-200 font-serif"
              >
                Unlock Family Vault
              </Button>
            </form>
            <p className="text-center text-sm text-main-text/60 font-serif">
              For demo purposes, use any password
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-beige flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2 bg-primary-green rounded-full">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-main-text font-sans">MoolahVault</h1>
        </div>
        <h2 className="text-4xl font-bold text-main-text mb-4 font-sans">Who's using MoolahVault?</h2>
        <p className="text-lg text-main-text/70 font-serif">Select your profile to continue.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 max-w-4xl">
        {mockUsers.map((user) => (
          <Card
            key={user.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 bg-white backdrop-blur-sm hover:bg-gray-50 w-full sm:w-48"
            onClick={() => handleProfileSelect(user)}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
              <div className="p-6 rounded-full bg-primary-green/10">{getUserIcon(user)}</div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-main-text mb-1 font-serif">{user.name}</h3>
                <p className="text-sm font-medium text-main-text/60 font-serif">
                  {user.type === "ADULT" ? "Adult" : "Child"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
