"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingCart, PiggyBank, HandHeart, User, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Bucket {
  id: string
  name: string
  balance: number
  icon: string
  assignedChildren: string[]
}

interface Transaction {
  id: string
  description: string
  amount: number
  type: "DEPOSIT" | "WITHDRAWAL"
}

export default function ChildDashboard({ params }: { params: { id: string } }) {
  const router = useRouter()

  const childData = {
    name: "Max",
    buckets: [
      { id: "spend", name: "Spend", balance: 45.75, icon: "ShoppingCart", assignedChildren: ["3"] },
      { id: "save", name: "Save", balance: 125.5, icon: "PiggyBank", assignedChildren: ["3"] },
      { id: "give", name: "Give", balance: 20.0, icon: "HandHeart", assignedChildren: ["3"] },
    ] as Bucket[],
    recentTransactions: [
      { id: "1", description: "Weekly Allowance", amount: 10.0, type: "DEPOSIT" as const },
      { id: "2", description: "Bookstore", amount: -12.5, type: "WITHDRAWAL" as const },
      { id: "3", description: "Ice Cream", amount: -4.75, type: "WITHDRAWAL" as const },
      { id: "4", description: "Birthday Money from Grandma", amount: 50.0, type: "DEPOSIT" as const },
      { id: "5", description: "Toy Store", amount: -8.25, type: "WITHDRAWAL" as const },
    ] as Transaction[],
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getBucketIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingCart":
        return <ShoppingCart size={48} className="text-primary-green" />
      case "PiggyBank":
        return <PiggyBank size={48} className="text-primary-green" />
      case "HandHeart":
        return <HandHeart size={48} className="text-primary-green" />
      default:
        return <ShoppingCart size={48} className="text-primary-green" />
    }
  }

  const handleSwitchProfile = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background-beige">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-green rounded-full">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-main-text font-sans">MoolahVault</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                <User size={20} className="text-main-text" />
                <ChevronDown size={16} className="text-main-text" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleSwitchProfile} className="cursor-pointer">
                <User size={16} className="mr-2" />
                Switch Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-main-text mb-2 font-sans">Hi, {childData.name}! 👋</h1>
          <p className="text-lg text-muted-text font-serif">Here's how your money is doing today</p>
        </div>

        {/* Buckets Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {childData.buckets.map((bucket) => (
            <Card key={bucket.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-main-text font-sans">{bucket.name}</CardTitle>
                {getBucketIcon(bucket.icon)}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary-green">{formatCurrency(bucket.balance)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What's New Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-main-text font-sans">What's New? 🎉</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {childData.recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-main-text font-medium font-serif">{transaction.description}</span>
                  <span
                    className={`text-lg font-bold ${transaction.type === "DEPOSIT" ? "text-success-green" : "text-danger-red"}`}
                  >
                    {transaction.type === "DEPOSIT" ? "+" : ""}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
